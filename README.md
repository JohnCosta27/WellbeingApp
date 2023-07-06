# Wellbeing App

## Backend

We are using firebase, and firebase emulators to locally develop.

## TODO

- [ ] Finish MyProgress page (Involves phone screen compatibility)
  - [x] Refactoring into smaller components (Currently its in one big one)
  - [ ] Make it look nice, design wise (This will involve designing actual UI components).
    - [ ] cards with stats for each module
    - [ ] Overall stats card
  - [x] Make the module selector work! search/dropdown thing?
  - [x] Make the assignments work
  - [ ] make the assignments editable
- [ ] Who Page
  - [x] Make the past brands a bit nicer to look at.
    - [x] Have better titles/lables for each brand
  - [ ] have a professional/academic section
  - [ ] Make it obvious what each thing does.
- [ ] How page
  - [ ] Wellness check
    - [x] Show the phrases
  - [ ] Mental Energy graph
    - [ ] Mobile scaling
    - [ ] X axis labels
    - [ ] View all entries button move
    - [ ] graph tooltip modifications
    - [ ] time range selector?
- [ ] CV stuff
  - [x] drawio mindmap example

General stuff:

- [ ] Edit the colour scheme
- [ ] Mobile compatibility on all pages

## BUGS

- [ ] The user needs to have 1 brand without a date, the system should just select the most recent one in the case they have 1 brand with a date.
- [ ] The Ibrands need to allow more only 1 of each brand to be selected (maybe with a count?) this will make the word cloud better!
- [x] Mental Energy vertical scaling issue on how page.
- [ ] All Dialogs do not work with mobile
- [ ] My Progress mobile scaling
- [ ] My progress removing module endpoint fails if there are any assignments associated with the module.

## URGENT TODO

- [x] Names for the brands
- [ ] Fix the who am i brand submition, it's not working well, with the active brand and it's failing to save the brand properly.