# Project Blueprint

## Overview

This is a trendy, interactive quiz website designed with an Instagram-like aesthetic. The core feature is a "Balance Game" that users can play, with two modes: a "Couple Balance Game" and a "Friend Balance Game." The goal is to create a fun, engaging, and highly shareable web application with multi-language support (Korean & English).

## Implemented Features

*   A basic quiz structure with a gradient background and language switching has been implemented.

## Current Plan: Content Pivot to Balance Game

Based on user feedback, the project is pivoting from a "Look-Alike Finder" to a "Balance Game."

1.  **Change Content to "Balance Game":**
    *   The quiz content will be completely replaced with two sets of "Balance Game" questions: one for couples and one for friends.
    *   Questions will be available in both Korean and English.

2.  **Update UI for Game Selection:**
    *   **`index.html`:** The start screen will be modified to include two distinct buttons: "Couple Balance Game" and "Friend Balance Game."
    *   The result screen will be simplified to a "Game Over" message, as there is no final "result" in a balance game.

3.  **Update `main.js` Logic:**
    *   Remove all logic related to scoring and celebrity matching.
    *   Create a new data structure to hold the questions for both game modes and both languages.
    *   Implement logic to start the correct game mode based on the user's selection and progress through the questions.

4.  **Refine Visual Design:**
    *   Ensure the new dual-button layout on the start screen is visually appealing and intuitive.
    *   Maintain the overall modern, clean, and animated aesthetic.
