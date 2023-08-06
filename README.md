# Dormable!

Dormable is a web application that allows students to find their ideal roommate. It is built using the MEN stack (
MongoDB, Express, Node.js).

## MEDIA ACCURACY DISCLAIMER

<font size ="8">The data represented in this project, including reviews and evaluations of dormitories or buildings,
are intended solely for educational purposes and do not accurately reflect the actual state, quality, or opinions of
these establishments.
The data has been fabricated or anonymized and should not be used as a factual reference. </font>

## Project Local Setup

1. Clone the repo (or download the zip file):
    ```
    git clone git@github.com:SakuZN/CCAPDEV_Dormable.git
    cd project
    ```

2. Install Node.js and npm if not already installed. You can download Node.js [here](https://nodejs.org/en/download/)
   which comes with npm installed.

3. Make sure you are in the root directory of the project. Create a `.env` file and
   go to [this link](https://pastebin.com/chjvhT8S) and paste the contents of the file into your `.env` file.
   The password for the paste bin is "nameOfOurCourse_nameOfOurProject_groupNumber" (all lowercase and no special
   characters).

4. Run the following scripts to easily set up the project:
    ```
   npm run localSetup
    ```

5. The console should output successful connection and the link
   to the local port `localhost:3000` the application is running on. Open the link in your browser.

6. If for some reason the connection fails, run this script instead:
    ```
    npm run gulp-start
    ```
   The application will run on `localhost:3000`

## Deployment

Alternatively, you can access the deployed version of the application [here](https://dormable.fly.dev/).

## Usage

This website is very simple and some features are still missing.
However, its fully functional and you can create an account, login, and logout.
You can also create a profile and edit it. You can also view other people's profiles.
Most importantly, read and write reviews of various dorms found within Taft or near DLSU.
![img.png](img.png)
![img_1.png](img_1.png)
![img_2.png](img_2.png)
![img_3.png](img_3.png)
![img_4.png](img_4.png)
