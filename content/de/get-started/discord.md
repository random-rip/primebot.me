---
title: PrimeBot für Discord
navigation:
  icon: i-simple-icons-discord
---

## Features

:feature-matrix

## Erste Schritte

1. Stelle sicher, dass du die entsprechenden Rechte hast, einen Bot zum Server hinzuzufügen.
2. Füge den Bot über [diesen Link](https://discord.com/oauth2/authorize?client_id=739550721703280700) zum Server hinzu.
3. Schreibe `/start TEAM_LINK` und ersetze `TEAM_LINK` mit deinem Team-Link von der Prime League.
4. Wenn du magst, kannst du mit `/settings` die Benachrichtigungen personalisieren, eine andere Scouting-Website festlegen oder eine Discordrolle festlegen.

## Befehle

Hier findest du eine Übersicht aller Befehle, die in Discord verfügbar sind.

::field-group
  :::field{name="/start [TEAM-LINK]"}
  Registriert das übergebene Team in dem Channel. In dem Channel darf noch kein Team registriert sein und das Team darf in keinem anderen Channel registriert sein. Beispiel: `/start https://www.primeleague.gg/leagues/teams/105959-leipzig-esports-e-v-ttt`
  :::

  :::field{name="/role"}
  Setzt eine Discord-Rolle, die bei Benachrichtigungen erwähnt werden soll.
  :::

  :::field{name="/matches"}
  Gibt einen Überblick über alle noch nicht gespielten Spiele, sowie den Status der Terminvorschläge und Lineups der Gegner.
  :::

  :::field{name="/match"}
  Gibt eine detaillierte Übersicht über den Spieltag: Terminstatus mit allen Terminvorschlägen, alle Scouting-Links, leagueofgraphs.com Link der Spieler:innen, Informationen über den Spieltag und das Ergebnis des Matches.
  :::

  :::field{name="/settings"}
  Erstellt einen Link, in denen Benachrichtigungseinstellungen für das Team und den Channel gesetzt werden können. Der Link ist 60 Minuten gültig.
  :::

  :::field{name="/delete"}
  Löscht das Team in dem Channel und die Benachrichtigungseinstellungen, sofern das Team nicht auch in Telegram registriert wurde.
  :::

  :::field{name="/fix"}
  Löscht den bestehenden Webhook des Channels (wenn er existiert) und erstellt einen neuen Webhook.
  :::

  :::field{name="/bop"}
  What's boppin'?
  :::

  :::field{name="/help"}
  Ruft eine Übersicht aller Befehle auf.
  :::
::

## FAQ

Probleme mit dem PrimeBot? Finde hier die Antwort!

::accordion
  :::accordion-item{label="Im Channel werden keine Benachrichtigungen (mehr) gesendet, obwohl wir welche bekommen müssten."}
  1. Benachrichtigungen werden nicht in Realzeit gesendet! Der PrimeBot durchsucht alle 15 Minuten die Prime League Website nach neuen Informationen. Aus diesem Grund werden Benachrichtigungen spätestens nach 15 Minuten gesendet. _Derzeit wird der PrimeBot von Seiten der PRM auf eine Anfrage pro Sekunde limitiert. Wichtige Nachrichten sollten ca. nach spätestens 20 Minuten gesendet werden. Nachrichten zu entfernteren Spieltagen haben eine niedrigere Priorität._
  2. Stelle sicher, dass der Bot alle benötigten Berechtigungen hat. [Siehe Einladungslink](https://discord.com/oauth2/authorize?client_id=739550721703280700).
  3. Sollten weiterhin Probleme bestehen, wende dich bitte an uns.
  :::

  :::accordion-item{label="Nachdem ich den Bot zum Server hinzugefügt habe und einen Befehl eingegeben habe, antwortet er nicht."}
  1. Stelle sicher, dass der Bot alle nötigen Berechtigungen hat. [Siehe Einladungslink](https://discord.com/oauth2/authorize?client_id=739550721703280700).
  2. Stelle sicher, dass der Bot den Channel sehen kann, wo du den Befehl eingegeben hast.
  3. Sollten weiterhin Probleme bestehen, wende dich bitte an uns.
  :::

  :::accordion-item{label='Ich bekomme bei /start die Antwort "Aus dem Übergabeparameter konnte keine ID gefunden werden."'}
  Beispiel, wenn du die URL übergeben möchtest:

  ```
  /start https://www.primeleague.gg/leagues/teams/105959-primebot
  ```

  Beispiel, wenn du die Team-ID übergeben möchtest:

  ```
  /start 105959
  ```
  :::
::
