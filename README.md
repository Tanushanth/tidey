### Brief Overview ###
After a year of using random websites to calculate the grades I need to pass my courses, I realized having one place with all this information would be much more helpful. Tidey is a course organization website that calculates and saves your grades, course information, and important files all in one place. 

https://github.com/uzFer/tidey/assets/109243682/c90e0f0d-3baf-44fc-9d02-aeb115942294

### Features ###
- Grade calculator (for any non-registered user)
- Course dashboard displayed in carousel
  - Users can add, edit, or delete courses to their dashboard
  - Each course has its own grade calculator which saves any input changes
  - Ability to upload and label files (i.e. syllabi, rubrics, etc.)
- Sign up/login pages

### Tech Used ###
- Used _React.js_ for building the UI, including animation on homescreen, modals, and course card layouts.
- _Google Firebase_ for account management, specifically: 
  - _Firestore Database_ for storing all course info
  - _Authentication_ for storing user emails + validating upon sign in/sign up
  - _Storage_ for holding the users' course-related files
