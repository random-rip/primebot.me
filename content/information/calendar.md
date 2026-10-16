---
title: Kalender Integration
---

::callout{icon="i-lucide-flask-conical" color="warning"}
Die Integration befindet sich noch in der Beta-Phase und kann Fehler enthalten. Lasst uns wissen, wenn ihr Fehler findet oder Verbesserungsvorschläge habt. Joint dazu einfach unserem [Discord-Server](https://discord.gg/K8bYxJMDzu).
::

::note
Nur Daten von registrierten Teams (die den PrimeBot benutzen) sind verfügbar.
::

## Features

Alle Matches eures Teams könnt ihr in euren Kalender integrieren. Wenn ihr den Kalender abonniert, werden neue Matches automatisch hinzugefügt und Matches, die abgesagt oder verschoben wurden, automatisch aktualisiert.

Die Termine werden standardmäßig in eurer Zeitzone angezeigt und mit einer Dauer von 2 Stunden eingetragen.

In den Informationen eines Termins findet ihr folgende Informationen:

- Den Spieltag und den Link zum Match auf der Prime League Website
- Den op.gg-Link eures Gegners
- Den op.gg-Link des Lineups eures Gegners sofern verfügbar
- Informationen, ob Terminvorschläge von euch oder den Gegnern offen sind oder ein Termin festgelegt worden ist.
  - Das Emoji im Titel verrät euch, ob ein Termin bereits festgelegt worden ist:
    - ⚔ Spieltermin festgelegt
    - 📆 Keine Termine wurden vorgeschlagen
    - ✅ Terminvorschläge von euch sind offen
    - ⚠ Terminvorschläge eures Gegners sind offen!

## Kalender abonnieren

**Voraussetzung:** Für die Kalender-Integration benötigt ihr die TEAM-ID eures Teams. Diese findet ihr in der URL eures Teams auf der Prime League Website. Die Team-ID ist die Zahl im letzten Teil der URL und besteht meistens aus 6-8 Ziffern.

Eure Team-ID muss dann im folgenden Feed-Link ersetzt werden:

```
https://primebot.me/api/v1/teams/TEAM-ID/feed
```

#### Beispiel

- Euer Team ist unter der Adresse `https://www.primeleague.gg/leagues/teams/105959-les-primebot-devs` erreichbar → `105959` ist die TEAM-ID.
- Der Feed-Link für euer Team lautet dann: `https://primebot.me/api/v1/teams/105959/feed`

### Google Kalender

1. Entweder über [diesen Link](https://calendar.google.com/calendar/u/0/r/settings/addbyurl) (am Computer)
2. Oder manuell:
   1. Öffnet euren Google Kalender auf dem Computer
   2. Klickt auf das "+"-Symbol neben "Weitere Kalender"
   3. Wählt "Per URL" aus
   4. Fügt euren Feed-Link ein und klickt auf "Kalender hinzufügen"

_Quelle: [support.google.com](https://support.google.com/calendar/answer/37100?hl=de&co=GENIE.Platform%3DDesktop)_

### Apple Kalender

1. Öffnet euren Apple Kalender auf dem Computer
2. Wähle die Option "Ablage" > "Neues Kalenderabonnement"
3. Fügt euren Feed-Link in das Feld "Kalender-URL" ein und klickt auf "Abonnieren"
4. Gebt einen Namen für den Kalender ein (bspw. "Prime League") und wähle eine Farbe aus, damit du ihn auf deinem Kalender gut lesen kannst.
5. Wähle im Menü "Ort" die Option "iCloud" aus, damit der Kalender auf all deinen Geräten verfügbar ist und klicke auf "OK".

_Quelle: [support.apple.com](https://support.apple.com/de-de/102301)_

### Thunderbird Kalender

1. Öffnet euren Thunderbird
2. Wählt auf dem Tab "Home" die Option "Neuen Kalender erstellen" > "Im Netzwerk" > "iCalendar (ICS)" aus
3. Fügt euren Feed-Link in das Feld "Standort" ein und klickt auf "Weiter"
4. Benennt den Kalender (bspw. "Prime League"). Dieser Name wird in der Kalenderliste von Thunderbird angezeigt
5. Klickt auf "Fertig"

_Quelle: [support.mozilla.org](https://support.mozilla.org/de/kb/Ferienkalender-hinzufuegen)_

### Outlook Kalender

Aus einem uns unbekannten Grund ist es nicht möglich, den Kalender in Outlook hinzuzufügen. Wenn ihr wisst, wie es geht, lasst es uns bitte wissen. Joint dazu einfach unserem [Discord-Server](https://discord.gg/K8bYxJMDzu).
