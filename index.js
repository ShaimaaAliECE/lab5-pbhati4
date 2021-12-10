const express = require('express');
const app = express();
const jobList = require("./jobs.json");

app.use(express.static('static'));

app.get('/', (req, res) => {
    res.sendFile('/static/index.html', { root: __dirname })
})

app.get('/jobsInJson', (req,res) => {
      res.json(jobList);
})


app.get('/jobCategories', (req, res) => { //q1 - categories mentioned in all the jobs and how many times each category was mentioned
    let jobCategories = {}; //holder for the job categories and their counts

    for (let j in jobList) {
        for (let c of jobList[j].jobCategories) { //inner loop to count the same categories

            if (!jobCategories[c]) { //add count to a new category 
                jobCategories[c] = 1;

            } else {
                jobCategories[c]++;
            }
        }            
    }

    res.json(jobCategories); //send response
});


app.get('/:jobsInCategory', (req, res) => { //q2 - jobs with a given category
    let jobsInCategory = []; //holder for the jobs matching in the category

    for (let j in jobList) { //loop over job list
        if (jobList[j].categories.includes(req.params['jobsInCategory'])) { //check to see if the job categories include the given one
            jobsInCategory.push(j);
        }
    }
    res.json(jobsInCategory) //send response
});


app.get('/jobsInCity', (req, res) => {//q3 - jobs in a given city
    let jobsInCity =  []; //holder for the jobs list
    let city = req.query.city;

    for (let j in jobList) {
        if (jobList[j].title.includes(city)) { //check to see if the city matches the given one
            jobsInCity.push(j);
        }
    }
    res.json(jobsInCity) //send response
});


app.listen(80);