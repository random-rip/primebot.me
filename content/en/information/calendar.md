---
title: Calendar Integration
---

::callout{icon="i-lucide-flask-conical" color="warning"}
The integration is still in beta and may contain bugs. Let us know if you find any bugs or have suggestions for improvement. Just join our [Discord server](https://discord.gg/K8bYxJMDzu).
::

::note
Only data of registered teams (that use PrimeBot) is available.
::

## Features

You can add all of your team's matches to your calendar. Once you subscribe to the calendar, new matches are added automatically, and matches that are cancelled or rescheduled are updated automatically.

By default, events are shown in your time zone and are entered with a duration of 2 hours.

The details of an event contain the following information:

- The match day and the link to the match on the Prime League website
- The op.gg link of your opponent
- The op.gg link of your opponent's lineup, if available
- Whether scheduling suggestions by you or your opponents are open or a date has been set.
  - The emoji in the title tells you whether a date has already been set:
    - ⚔ Match date set
    - 📆 No dates have been suggested
    - ✅ Your scheduling suggestions are open
    - ⚠ Your opponent's scheduling suggestions are open!

## Subscribe to the calendar

**Prerequisite:** For the calendar integration you need your team's TEAM-ID. You can find it in your team's URL on the Prime League website. The team ID is the number in the last part of the URL and usually consists of 6-8 digits.

Replace the team ID in the following feed link:

```
https://primebot.me/api/v1/teams/TEAM-ID/feed
```

#### Example

- Your team can be found at `https://www.primeleague.gg/leagues/teams/105959-les-primebot-devs` → `105959` is the TEAM-ID.
- The feed link for your team is then: `https://primebot.me/api/v1/teams/105959/feed`

### Google Calendar

1. Either via [this link](https://calendar.google.com/calendar/u/0/r/settings/addbyurl) (on a computer)
2. Or manually:
   1. Open your Google Calendar on a computer
   2. Click the "+" icon next to "Other calendars"
   3. Select "From URL"
   4. Paste your feed link and click "Add calendar"

_Source: [support.google.com](https://support.google.com/calendar/answer/37100?hl=en&co=GENIE.Platform%3DDesktop)_

### Apple Calendar

1. Open your Apple Calendar on a computer
2. Choose "File" > "New Calendar Subscription"
3. Paste your feed link into the "Calendar URL" field and click "Subscribe"
4. Enter a name for the calendar (e.g. "Prime League") and pick a color so you can easily spot it in your calendar.
5. In the "Location" menu, choose "iCloud" so the calendar is available on all your devices, and click "OK".

_Source: [support.apple.com](https://support.apple.com/en-us/102301)_

### Thunderbird Calendar

1. Open Thunderbird
2. On the "Home" tab, choose "New Calendar" > "On the Network" > "iCalendar (ICS)"
3. Paste your feed link into the "Location" field and click "Next"
4. Name the calendar (e.g. "Prime League"). This name is shown in Thunderbird's calendar list
5. Click "Finish"

_Source: [support.mozilla.org](https://support.mozilla.org/en-US/kb/adding-a-holiday-calendar)_

### Outlook Calendar

For reasons unknown to us, it is not possible to add the calendar in Outlook. If you know how to do it, please let us know. Just join our [Discord server](https://discord.gg/K8bYxJMDzu).
