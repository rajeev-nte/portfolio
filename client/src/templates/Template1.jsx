import React from 'react';

// --- Icon Components for the Template ---
const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const LinkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>;

const Template1 = ({ data }) => {
    const { fullName, email, bio, skills, projects, experience } = data;

    return (
        <div className="font-sans text-gray-800 bg-white">
            {/* Header Section */}
            <header className="bg-slate-800 text-white p-12 text-center">
                <h1 className="text-5xl font-extrabold tracking-tight">{fullName}</h1>
                <div className="flex justify-center items-center mt-4 text-slate-300">
                    <MailIcon />
                    <a href={`mailto:${email}`} className="ml-2 hover:text-indigo-400 transition-colors">{email}</a>
                </div>
            </header>

            <main className="p-8 md:p-12 max-w-5xl mx-auto">
                {/* About Me Section */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold border-b-4 border-indigo-500 pb-2 mb-4 inline-block">About Me</h2>
                    <p className="text-lg text-gray-600 leading-relaxed">{bio}</p>
                </section>

                {/* Skills Section */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold border-b-4 border-indigo-500 pb-2 mb-6 inline-block">Skills</h2>
                    <div className="flex flex-wrap gap-3">
                        {skills.map((skill, index) => (
                            <span key={index} className="bg-indigo-100 text-indigo-800 text-md font-semibold px-4 py-2 rounded-full">
                                {skill}
                            </span>
                        ))}
                    </div>
                </section>

                {/* Experience Section */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold border-b-4 border-indigo-500 pb-2 mb-6 inline-block">Work Experience</h2>
                    <div className="space-y-8">
                        {experience.map((exp, index) => (
                            <div key={index} className="pl-4 border-l-4 border-slate-200">
                                <h3 className="text-2xl font-semibold">{exp.title}</h3>
                                <p className="text-lg text-indigo-600 font-medium">{exp.company} | {exp.years}</p>
                                <p className="mt-2 text-gray-600">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Projects Section */}
                <section>
                    <h2 className="text-3xl font-bold border-b-4 border-indigo-500 pb-2 mb-6 inline-block">Projects</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {projects.map((project, index) => (
                            <div key={index} className="bg-slate-50 border border-slate-200 rounded-lg shadow-md p-6 transform hover:-translate-y-2 transition-transform duration-300">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-2xl font-bold">{project.title}</h3>
                                    {project.link && (
                                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:text-indigo-700 transition-colors">
                                            <LinkIcon />
                                        </a>
                                    )}
                                </div>
                                <p className="text-gray-600">{project.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Template1;

