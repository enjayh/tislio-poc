# Tislio Design Document

## Overview
This document lays out the MVP design application that organizes notes using metadata.

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
- Log out.
- Create a category.
- Display categories.
- Create a trait.
- Display traits.
- Create note.
- Display notes.
- Delete a note.
- Add a category to a note.
- Remove a category to a note.
- Add a trait to a note.
- Remove a trait from a note.
- Display notes based on selected tags (filtering).

## Data Model
Note: this does not include data for authentication and authorization.

### Account
The email address of the Account is used to associate with the current email in the session.

| name | type |
| - | - |
| id | pk |
| email | text |
| created_at | datetime |

### Tag
| name | type |
| - | - |
| id | pk |
| name | text |
| account_id | fk |

### Trait
| name | type |
| - | - |
| id | pk |
| name | text |
| type | text (enum: TEXT/INT/FLOAT/DATE/BOOL) |
| account_id | fk |

### Note
| name | type |
| - | - |
| id | pk |
| body | text |
| completed | boolean |
| account_id | fk |
| created_at | datetime |
| last_updated | datetime |

### NotesTags
| name | type |
| - | - |
| id | pk |
| note_id | fk |
| tag_id | fk |

### NotesTraits
| name | type |
| - | - |
| id | pk |
| note_id | fk |
| trait_id | fk |
| trait_value | text |

## UI
- Account
  - Create an account
  - Log in to an account
- Tag (for an account)
  - List all tags
  - Create a tag
- Trait (for an account)
  - List all traits
  - Create a trait
- Note (for an account)
  - List all notes with filters
  - Create a note
  - Edit a note
  - Delete a note

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