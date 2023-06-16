# Wellbeing App

## Backend

We are using firebase, and firebase emulators to locally develop.

## TODO

- [ ] Finish MyProgress page (Involves phone screen compatibility)
  - [ ] Refactoring into smaller components (Currently its in one big one)
  - [ ] Make it look nice, design wise (This will involve designing actual UI components).
  - [ ] Make the module selector work! search/dropdown thing?
  - [ ] Make the assignments work
- [ ] Who Page
  - [ ] Make the past brands a bit nicer to look at.
    - [ ] Have some brands bigger than others!
    - [ ] Let people add their own brands
    - [ ] Have better titles/lables for each brand
  - [ ] have a professional/academic section
  - [ ] Make it obvious what each thing does.
- [ ] How page
  - [ ] Wellness check 
    - [ ] Show the phrases
    - [ ] Let the user input their own phrases
    - [ ] submit the phrases to the database
  - [ ] Mental Energy graph
    - [ ] Mobile scaling
    - [ ] X axis labels
    - [ ] View all entries button move
    - [ ] graph tooltip modifications
    - [ ] time range selector?
- [ ] CV stuff
  - [ ] 


## BUGS

- [ ] The user needs to have 1 brand without a date, the system should just select the most recent one in the case they have 1 brand with a date.
- [ ] The Ibrands need to allow more only 1 of each brand to be selected (maybe with a count?) this will make the word cloud better!
- [x] Mental Energy vertical scaling issue on how page.
- [ ] All Dialogs do not work with mobile