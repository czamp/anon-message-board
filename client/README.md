# Views

## Board List

Gets a list of boards from API and creates links to those boards

## Board View

Gets a list of the 10 newest threads for the given board.
Can create new thread on this board.
Each thread preview has 3 replies shown.

## Thread View

Gets the entire thread (from thread_id), along with all comments
Can create new reply to this threads


# Components

## Component Hierarchy

### Board List View

BoardList
  |_ BoardListItem
      |_ Link

### Board View

NewThread
  |_ Text Area
  |_ Input
  |_ Submit Button

ThreadList
  |_ ThreadPreview
      |_ (thread_id, created_on, text)
      |_ Delete Button
      |_ Report Button
      |_ ReplyComponent (x3)
          |_ Delete Button
          |_ Report Button

### Thread View

ThreadComponent
  |_ (thread_id, posted_on, text)
  |_ Delete Button
  |_ Report Button
  |_ ReplyComponent (* replies.length)
      |_ (reply_id, created_on, text)
      |_ Delete Button
      |_ Report Button
NewReply
  |_ Text Area
  |_ Input
  |_ Submit Button

## Component list

- BoardList
- BoardListItem
- NewThreadForm
- ThreadList
- ThreadPreview
- DeleteButton
- ReportButton
- ReplyComponent
- ThreadComponent
- NewReplyForm

# API Calls

- List Boards (GET /api/boards)
- New thread (POST /api/threads/:board)
- Report thread (PUT /api/threads/:board)
- Delete thread (DELETE /api/threads/:board)
- New reply (POST /api/replies/:board)
- Report reply (PUT /api/replies/:board)
- Delete reply (DELETE /api/replies/:board
