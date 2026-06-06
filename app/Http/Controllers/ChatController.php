<?php

namespace App\Http\Controllers;

use App\Ai\Agents\ClinicAssistant;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Throwable;

class ChatController extends Controller
{
    /**
     * Handle an incoming chat message and return the assistant's reply.
     */
    public function __invoke(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'message' => ['required', 'string', 'max:2000'],
            'history' => ['array'],
            'history.*.role' => ['required_with:history', 'in:user,assistant'],
            'history.*.content' => ['required_with:history', 'string'],
        ]);

        try {
            $response = (new ClinicAssistant($validated['history'] ?? []))
                ->prompt($validated['message']);

            return response()->json([
                'reply' => (string) $response,
            ]);
        } catch (Throwable $e) {
            report($e);

            return response()->json([
                'reply' => 'Excuses, er ging iets mis. Probeer het later opnieuw of neem telefonisch contact met ons op.',
            ], 500);
        }
    }
}
