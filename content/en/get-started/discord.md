---
title: PrimeBot for Discord
navigation:
  icon: i-simple-icons-discord
---

## Features

:feature-matrix

## Getting started

1. Make sure you have the permissions required to add a bot to the server.
2. Add the bot to the server via [this link](https://discord.com/oauth2/authorize?client_id=739550721703280700).
3. Type `/start TEAM_LINK` and replace `TEAM_LINK` with your team link from the Prime League.
4. If you like, you can use `/settings` to personalize the notifications, choose a different scouting website or set a Discord role.

## Commands

Here you can find an overview of all commands available in Discord.

::field-group
  :::field{name="/start [TEAM-LINK]"}
  Registers the given team in the channel. No team may be registered in the channel yet, and the team may not be registered in any other channel. Example: `/start https://www.primeleague.gg/leagues/teams/105959-leipzig-esports-e-v-ttt`
  :::

  :::field{name="/role"}
  Sets a Discord role that gets mentioned in notifications.
  :::

  :::field{name="/matches"}
  Gives an overview of all games not yet played, along with the status of scheduling suggestions and the opponents' lineups.
  :::

  :::field{name="/match"}
  Gives a detailed overview of the match day: scheduling status with all suggestions, all scouting links, leagueofgraphs.com links of the players, information about the match day and the match result.
  :::

  :::field{name="/settings"}
  Creates a link where notification settings for the team and the channel can be set. The link is valid for 60 minutes.
  :::

  :::field{name="/delete"}
  Deletes the team in the channel and its notification settings, unless the team is also registered in Telegram.
  :::

  :::field{name="/fix"}
  Deletes the channel's existing webhook (if there is one) and creates a new webhook.
  :::

  :::field{name="/bop"}
  What's boppin'?
  :::

  :::field{name="/help"}
  Shows an overview of all commands.
  :::
::

## FAQ

Problems with PrimeBot? Find the answer here!

::accordion
  :::accordion-item{label="No notifications are being sent to the channel (anymore), even though we should be getting some."}
  1. Notifications are not sent in real time! PrimeBot checks the Prime League website for new information every 15 minutes, so notifications are sent after 15 minutes at the latest. _PrimeBot is currently limited to one request per second by PRM. Important messages should be sent after about 20 minutes at the latest. Messages about match days further in the future have a lower priority._
  2. Make sure the bot has all required permissions. [See invite link](https://discord.com/oauth2/authorize?client_id=739550721703280700).
  3. If the problems persist, please contact us.
  :::

  :::accordion-item{label="After adding the bot to the server and entering a command, it doesn't respond."}
  1. Make sure the bot has all necessary permissions. [See invite link](https://discord.com/oauth2/authorize?client_id=739550721703280700).
  2. Make sure the bot can see the channel where you entered the command.
  3. If the problems persist, please contact us.
  :::

  :::accordion-item{label='On /start I get the reply "No ID could be found in the given parameter."'}
  Example if you want to pass the URL:

  ```
  /start https://www.primeleague.gg/leagues/teams/105959-primebot
  ```

  Example if you want to pass the team ID:

  ```
  /start 105959
  ```
  :::
::
