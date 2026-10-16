---
title: PrimeBot for Telegram
navigation:
  icon: i-simple-icons-telegram
---

## Features

:feature-matrix

## Getting started

1. Create a Telegram group and add the bot `PrimeLeague Bot` (or use [this link](https://t.me/prime_league_bot?startgroup=start)).
2. Type `/start` in the chat. After PrimeBot replies, post your team's Prime League link in the chat.
3. Personalize the bot with `/settings` so you only get the notifications you want.

## Commands

Here you can find an overview of all commands available in Telegram.

::field-group
  :::field{name="/start"}
  Starts the conversation to register a team. Afterwards, a team URL has to be entered. No team may be registered in the group yet, and the team may not be registered in any other group.
  :::

  :::field{name="/settings"}
  Creates a link where notification settings for the team and the group can be set. The link is valid for 60 minutes.
  :::

  :::field{name="/match [match_day]"}
  Gives a detailed overview of the match day: scheduling status with all suggestions, all scouting links, leagueofgraphs.com links of the players, information about the match day and the match result.
  :::

  :::field{name="/matches"}
  Gives an overview of all games not yet played, along with the status of scheduling suggestions and the opponents' lineups.
  :::

  :::field{name="/delete"}
  Deletes the team registered in the group and its notification settings, unless the team is also registered in Discord.
  :::

  :::field{name="/bop"}
  What's boppin'?
  :::

  :::field{name="/cancel"}
  Cancels the current conversation.
  :::

  :::field{name="/help"}
  Shows an overview of the commands listed here.
  :::

  :::field{name="/set_logo"}
  Sets the Prime League team picture as the group picture.
  :::
::

## FAQ

Problems with PrimeBot? Find the answer here!

::accordion
  :::accordion-item{label="No notifications are being sent to the group (anymore), even though we should be getting some."}
  1. Notifications are not sent in real time! PrimeBot checks the Prime League website for new information every 15 minutes, so notifications are sent after 15 minutes at the latest. _PrimeBot is currently limited to one request per second by PRM. Important messages should be sent after about 20 minutes at the latest. Messages about match days further in the future have a lower priority._
  2. Make sure the corresponding notifications are not disabled in your settings. Type `/settings` in the group chat and check whether the corresponding notifications are enabled.
  3. If the problems persist, please contact us.
  :::

  :::accordion-item{label="After adding the bot to the group and entering a command, it doesn't respond."}
  Make sure the bot has the following permissions:

  - Send messages
  - Send media
  - Embed links
  - Pin messages
  - Change group info

  If the problems persist, please contact us.
  :::

  :::accordion-item{label='After entering my team I get the reply "The given URL does not match the correct format".'}
  Example if you want to pass the URL:

  ```
  https://www.primeleague.gg/leagues/teams/105959-leipzig-esports-e-v-ttt
  ```

  Example if you want to pass the team ID:

  ```
  105959
  ```
  :::
::
