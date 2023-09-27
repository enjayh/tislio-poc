# Tislio Design Document

## Overview
This document lays out the MVP design application that organizes information using tags.

## User-Centric Goals
- Create a system for users to list of information they want to retrieve later, including:
  - Active tasks (todo)
  - Movies to watch
  - Book recommendations
  - Interesting articles to read later
  - Reminder to check the air filter every month
  - Re-read book X every 6 months
  - Things you’re waiting on other people for (and reminders if they don’t after a certain amount of time)

## User Cases and Functionality
- Create an account.
- Log in.
- Create an item of data (datum) for later use.
- Display one or more datum/data.
- Edit an existing datum.
- Delete an existing datum.
- Create a tag.
- List all tags.
- Edit a tag.
- Delete a tag.
- Add a tag to a datum.
- Remove a tag from a datum.
-  Display data based on selected tags (filtering).

## Data Model
Note: this does not include data for authentication and authorization.

### Account
The email address of the Account is used to associate with the current email in the session.

| name | type |
| - | - |
| id | pk |
| email | text |
| createdAt | datetime |
| lastUpdated | datetime |

### Tag
| name | type |
| - | - |
| id | pk |
| name | text |
| type | text (enum: TEXT/INT/FLOAT/DATE/BOOL) |
| account_id | fk |
| createdAt | datetime |
| lastUpdated | datetime |

### Datum
| name | type |
| - | - |
| id | pk |
| name | text |
| status | text (enum: ACTIVE/DONE) |
| account_id | fk |
| createdAt | datetime |
| lastUpdated | datetime |

### DatumTags
| name | type |
| - | - |
| id | pk |
| data_id | fk |
| tag_id | fk |
| value | text |
| createdAt | datetime |
| lastUpdated | datetime |

## UI
- Account
  - Select account from a list of all accounts
  - Create an account
- Tag
  - List all tags for an account
  - Create a tag
  - Edit tag (name only)
  - Delete a tag
- Data
  - List all data (with filter selections) for an account
  - Create a datum
  - Edit datum (name/status)
  - Add and remove tags for a datum

## Technologies
- Start with web technologies that allow easy use in both desktop and mobile environments.
- The drawback is that the application will require an internet connection to work.

## Appendix A: Potential Usages
- Todo list
- Pending list (tasks blocked/waiting on others)
  - Auto-reminder if stuck here too long
- Media list (movie/show/video game)
  - Watched
  - To watch
  - Last watched
  - Rating
  - Reminder to watch again