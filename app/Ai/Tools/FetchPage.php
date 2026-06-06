<?php

namespace App\Ai\Tools;

use Illuminate\Contracts\JsonSchema\JsonSchema;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Laravel\Ai\Contracts\Tool;
use Laravel\Ai\Tools\Request;
use Stringable;

class FetchPage implements Tool
{
    /**
     * The maximum number of characters of page text returned to the model.
     */
    private const MAX_LENGTH = 14000;

    /**
     * Get the description of the tool's purpose.
     */
    public function description(): Stringable|string
    {
        return 'Haalt de tekstinhoud op van een specifieke pagina van de kliniekwebsite. '
            .'Gebruik dit om actuele details, prijzen of uitleg over een behandeling op te zoeken. '
            .'Geef de exacte URL door uit de lijst met beschikbare pagina\'s.';
    }

    /**
     * Execute the tool.
     */
    public function handle(Request $request): Stringable|string
    {
        $url = (string) $request['url'];

        if (! $this->isAllowed($url)) {
            return 'Deze URL is niet toegestaan. Gebruik alleen pagina\'s van '
                .config('clinic.allowed_domain').' uit de lijst.';
        }

        return Cache::remember('clinic:page:'.md5($url), now()->addHour(), function () use ($url) {
            $response = Http::timeout(15)
                ->withHeaders(['User-Agent' => 'GoldenGlowAssistant/1.0'])
                ->get($url);

            if ($response->failed()) {
                return "Kon de pagina niet ophalen ({$response->status()}).";
            }

            return $this->extractText($response->body());
        });
    }

    /**
     * Determine whether the given URL belongs to the clinic's allowed domain.
     */
    private function isAllowed(string $url): bool
    {
        $host = parse_url($url, PHP_URL_HOST);

        if (! is_string($host)) {
            return false;
        }

        $domain = (string) config('clinic.allowed_domain');

        return $host === $domain || str_ends_with($host, '.'.$domain);
    }

    /**
     * Strip the HTML down to readable text suitable for the model.
     */
    private function extractText(string $html): string
    {
        $html = preg_replace('#<(script|style|noscript|svg|head)\b[^>]*>.*?</\1>#is', ' ', $html) ?? $html;
        $text = trim((string) preg_replace('/\s+/', ' ', strip_tags($html)));

        return (string) Str::limit($text, self::MAX_LENGTH);
    }

    /**
     * Get the tool's schema definition.
     */
    public function schema(JsonSchema $schema): array
    {
        return [
            'url' => $schema->string()->required(),
        ];
    }
}
