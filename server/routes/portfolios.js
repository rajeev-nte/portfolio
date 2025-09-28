// const router = require('express').Router();
// let Portfolio = require('../models/portfolio.model');

// // --- GET: Fetch a single portfolio by ID ---
// // Handles GET requests to /api/portfolios/:id
// router.route('/:id').get((req, res) => {
//     Portfolio.findById(req.params.id) // Find by the ID from the URL
//         .then(portfolio => res.json(portfolio))
//         .catch(err => res.status(400).json('Error: ' + err));
// });

// // --- POST: Add a new portfolio ---
// // Handles POST requests to /api/portfolios/add
// router.route('/add').post((req, res) => {
//     // Create a new Portfolio instance from the request body
//     const newPortfolio = new Portfolio({
//         fullName: req.body.fullName,
//         email: req.body.email,
//         bio: req.body.bio,
//         skills: req.body.skills,
//         projects: req.body.projects,
//         experience: req.body.experience,
//         template: req.body.template,
//     });

//     // Save the new portfolio to the database
//     newPortfolio.save()
//         .then((savedPortfolio) => res.json(savedPortfolio._id)) // Send back the new ID
//         .catch(err => res.status(400).json('Error: ' + err));
// });

// // --- POST: Update an existing portfolio by ID ---
// // Handles POST requests to /api/portfolios/update/:id
// router.route('/update/:id').post((req, res) => {
//     Portfolio.findById(req.params.id)
//         .then(portfolio => {
//             // Update all the fields with new data from the request body
//             portfolio.fullName = req.body.fullName;
//             portfolio.email = req.body.email;
//             portfolio.bio = req.body.bio;
//             portfolio.skills = req.body.skills;
//             portfolio.projects = req.body.projects;
//             portfolio.experience = req.body.experience;
//             portfolio.template = req.body.template;

//             // Save the updated portfolio
//             portfolio.save()
//                 .then(() => res.json('Portfolio updated!'))
//                 .catch(err => res.status(400).json('Error: ' + err));
//         })
//         .catch(err => res.status(400).json('Error: ' + err));
// });

// module.exports = router;

//.......................................

const router = require('express').Router();
let Portfolio = require('../models/portfolio.model');
const fs = require('fs');
const path = require('path');

// --- GET: Fetch a single portfolio by ID ---
// Handles GET requests to /api/portfolios/:id
router.route('/:id').get((req, res) => {
    Portfolio.findById(req.params.id) // Find by the ID from the URL
        .then(portfolio => res.json(portfolio))
        .catch(err => res.status(400).json('Error: ' + err));
});

// --- POST: Add a new portfolio ---
// Handles POST requests to /api/portfolios/add
router.route('/add').post((req, res) => {
    // Create a new Portfolio instance from the request body
    const newPortfolio = new Portfolio({
        fullName: req.body.fullName,
        email: req.body.email,
        bio: req.body.bio,
        skills: req.body.skills,
        projects: req.body.projects,
        experience: req.body.experience,
        template: req.body.template,
    });

    // Save the new portfolio to the database
    newPortfolio.save()
        .then((savedPortfolio) => res.json(savedPortfolio._id)) // Send back the new ID
        .catch(err => res.status(400).json('Error: ' + err));
});

// --- POST: Update an existing portfolio by ID ---
// Handles POST requests to /api/portfolios/update/:id
router.route('/update/:id').post((req, res) => {
    Portfolio.findById(req.params.id)
        .then(portfolio => {
            // Update all the fields with new data from the request body
            portfolio.fullName = req.body.fullName;
            portfolio.email = req.body.email;
            portfolio.bio = req.body.bio;
            portfolio.skills = req.body.skills;
            portfolio.projects = req.body.projects;
            portfolio.experience = req.body.experience;
            portfolio.template = req.body.template;

            // Save the updated portfolio
            portfolio.save()
                .then(() => res.json('Portfolio updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


// --- GET: Render a full HTML portfolio from Template 3 ---
// This route generates a standalone HTML page for a portfolio
router.route('/render/:id').get((req, res) => {
    Portfolio.findById(req.params.id)
        .then(portfolio => {
            if (!portfolio) {
                return res.status(404).send('Portfolio not found');
            }

            const templatePath = path.join(__dirname, '..', 'templates', 'template3.html');
            fs.readFile(templatePath, 'utf8', (err, htmlData) => {
                if (err) {
                    console.error("Error reading HTML template:", err);
                    return res.status(500).send("Internal Server Error");
                }

                // --- Generate Dynamic HTML for sections ---

                // Projects
                const projectsHtml = portfolio.projects.map(p => `
                    <div class="bg-gray-50 rounded-xl overflow-hidden shadow-sm card-hover fade-in">
                        <div class="p-6">
                            <h3 class="text-xl font-semibold mb-3">${p.title}</h3>
                            <p class="text-gray-600 mb-4">${p.description}</p>
                             ${p.link ? `<a href="${p.link}" target="_blank" rel="noopener noreferrer" class="w-full block text-center bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">View Project</a>` : ''}
                        </div>
                    </div>
                `).join('');
                
                // Skills
                const skillsHtml = portfolio.skills.map(skill => `
                    <div class="bg-white p-4 rounded-xl shadow-sm card-hover fade-in text-center">
                        <h3 class="text-lg font-semibold">${skill}</h3>
                    </div>
                `).join('');

                 // Experience
                 const experienceHtml = portfolio.experience.map(exp => `
                    <div class="bg-white p-6 rounded-xl shadow-sm card-hover fade-in">
                        <h3 class="text-xl font-semibold">${exp.title}</h3>
                        <p class="text-purple-600">${exp.company} | ${exp.years}</p>
                        <p class="text-gray-600 mt-2">${exp.description}</p>
                    </div>
                `).join('');

                // --- Replace placeholders in the template ---
                let finalHtml = htmlData
                    .replace(/{{FULL_NAME}}/g, portfolio.fullName)
                    .replace(/{{EMAIL}}/g, portfolio.email)
                    .replace(/{{BIO}}/g, portfolio.bio)
                    .replace('{{PROJECTS_HTML}}', projectsHtml)
                    .replace('{{SKILLS_HTML}}', skillsHtml)
                    .replace('{{EXPERIENCE_HTML}}', experienceHtml);

                res.send(finalHtml);
            });
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;

