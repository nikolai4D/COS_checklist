# Checklist with ContechOS as a db

1. First make sure you have installed these on your computer:
    <br/>a. Node.js (https://nodejs.org/en/download/)
    <br/>b. Git (https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

2. Create a new folder on your computer

3. Open the folder in a terminal/cmd ->
    - Mac: 
    <br/>a. Right click on the folder and press "new terminal in folder"
    - Windows:
    <br/>a. Click the Windows Start menu and type `cmd`.
    <br/>b. Click the Command Prompt icon to open it.
    <br/>c. Type `cd` followed by a space.
    <br/>d. Type the address of the folder after the space (i.e. `/Users/username/newfolder.`)
    <br/>e. Press Enter.

3. Clone this repository by writing in the terminal/cmd: `git clone https://github.com/nikolai4D/COS_checklist.git`

4. Go to the folder by writing in the terminal/cmd: `cd COS_checklist`

5. Install node packages by writing in the terminal/cmd: `npm install`

6. Get the database by 
<br/>a. Going into the folder `COS_checklist/resources/`
<br/>b. Unzipping `db.zip`
<br/>c. Move the unzipped folder `db` and `.env` to `/Users/username/newfolder/` (where the folder `COS_checklist` exist)

7. While being in folder `COS_checklist` (check where you are by typing `pwd`) 
 <br/>a. Run the database on your local computer by writing in the terminal/cmd: `npm run dev`

8. Go to a browser and enter localhost:3000 and login with credentials user: `admin`, password: `admin`
