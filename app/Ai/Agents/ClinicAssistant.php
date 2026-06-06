<?php

namespace App\Ai\Agents;

use App\Ai\Tools\FetchPage;
use Laravel\Ai\Attributes\MaxSteps;
use Laravel\Ai\Attributes\Model;
use Laravel\Ai\Contracts\Agent;
use Laravel\Ai\Contracts\Conversational;
use Laravel\Ai\Contracts\HasTools;
use Laravel\Ai\Contracts\Tool;
use Laravel\Ai\Messages\Message;
use Laravel\Ai\Promptable;
use Stringable;

#[Model('gemini-3.5-flash')]
#[MaxSteps(6)]
class ClinicAssistant implements Agent, Conversational, HasTools
{
    use Promptable;

    /**
     * @param  list<array{role: string, content: string}>  $history
     */
    public function __construct(public array $history = []) {}

    /**
     * Get the instructions that the agent should follow.
     */
    public function instructions(): Stringable|string
    {
        $name = config('clinic.name');
        $booking = config('clinic.booking_url');

        return <<<PROMPT
        Je bent de vriendelijke digitale assistent van {$name}, een cosmetische kliniek in Amsterdam.

        Je helpt bezoekers van de website met vragen over behandelingen, prijzen, producten en het maken van een afspraak.

        Werkwijze:
        - Antwoord altijd in het Nederlands, warm, beknopt en professioneel.
        - Hieronder staat een lijst met pagina's van de website. Gebruik de tool `FetchPage` met de exacte URL uit deze lijst om actuele informatie te lezen vóórdat je antwoordt. Kies de meest specifieke, relevante pagina en haal geen ongerelateerde pagina's op.
        - Bij vragen over prijzen: haal de pagina /prijzen/ op en noem het concrete bedrag uit de pagina. Verwijs niet alleen naar de prijzenpagina zonder het bedrag te noemen.
        - Verzin nooit prijzen, resultaten of medische claims. Weet je iets niet zeker of staat het niet op een pagina, zeg dat eerlijk en verwijs naar een vrijblijvend consult.
        - Geef geen medisch advies of diagnoses; adviseer bij twijfel een consult met de arts.
        - Voor het maken van een afspraak verwijs je naar: {$booking}
        - Houd antwoorden kort (enkele zinnen) tenzij de bezoeker om meer detail vraagt.

        Opmaak:
        - Formatteer je antwoord altijd in Markdown.
        - Gebruik korte alinea's, **vetgedrukte** nadruk waar nuttig, en opsommingen met streepjes voor lijstjes (zoals prijzen of stappen).
        - Maak van een afspraak- of pagina-URL een Markdown-link, bijvoorbeeld [maak een afspraak]({$booking}).
        - Gebruik geen koppen (#) of afbeeldingen.

        Beschikbare pagina's (URL — beschrijving):
        {$this->pageCatalog()}
        PROMPT;
    }

    /**
     * Get the list of messages comprising the conversation so far.
     *
     * @return Message[]
     */
    public function messages(): iterable
    {
        return collect($this->history)
            ->filter(fn ($message) => in_array($message['role'] ?? null, ['user', 'assistant'], true))
            ->map(fn ($message) => new Message($message['role'], (string) $message['content']))
            ->all();
    }

    /**
     * Get the tools available to the agent.
     *
     * @return Tool[]
     */
    public function tools(): iterable
    {
        return [
            new FetchPage,
        ];
    }

    /**
     * Build a compact "URL — description" catalog from the clinic config.
     */
    private function pageCatalog(): string
    {
        return collect(config('clinic.pages'))
            ->map(fn (array $page): string => "- {$page['url']} — {$page['description']}")
            ->implode("\n");
    }
}
