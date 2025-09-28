import React from 'react';

const Template2 = ({ data }) => {
    const { fullName, email, bio, skills, projects, experience } = data;

    return (
        <div className="font-serif bg-gray-50 text-gray-900">
            <div className="max-w-5xl mx-auto p-8 md:p-16 border-x-2 border-gray-200">
                {/* Header */}
                <header className="text-center mb-12 border-b-2 border-gray-300 pb-8">
                    <h1 className="text-6xl font-bold tracking-wider">{fullName}</h1>
                    <a href={`mailto:${email}`} className="text-lg text-gray-600 hover:text-blue-700 mt-2 inline-block">{email}</a>
                </header>

                <main>
                    {/* Bio Section */}
                    <section className="mb-12">
                        <p className="text-xl text-center italic text-gray-700 leading-loose">{bio}</p>
                    </section>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {/* Left Column: Skills & Projects */}
                        <div className="md:col-span-2">
                             {/* Projects Section */}
                            <section className="mb-10">
                                <h2 className="text-3xl font-semibold border-b border-gray-300 pb-2 mb-6">Projects</h2>
                                <div className="space-y-8">
                                    {projects.map((project, index) => (
                                        <div key={index}>
                                            <div className="flex justify-between items-baseline">
                                                <h3 className="text-2xl font-bold">{project.title}</h3>
                                                {project.link && (
                                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold hover:underline">
                                                        View Project
                                                    </a>
                                                )}
                                            </div>
                                            <p className="mt-2 text-gray-600">{project.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* Right Column: Experience */}
                        <div className="md:col-span-1">
                             {/* Skills Section */}
                            <section className="mb-10">
                                <h2 className="text-3xl font-semibold border-b border-gray-300 pb-2 mb-6">Skills</h2>
                                <ul className="list-disc list-inside space-y-2 text-gray-700">
                                    {skills.map((skill, index) => (
                                        <li key={index} className="text-lg">{skill}</li>
                                    ))}
                                </ul>
                            </section>
                        </div>
                    </div>

                     {/* Experience Section */}
                    <section>
                        <h2 className="text-3xl font-semibold border-b border-gray-300 pb-2 mb-6">Experience</h2>
                        <div className="space-y-8">
                            {experience.map((exp, index) => (
                                <div key={index} className="pl-6 border-l-2 border-gray-300">
                                    <h3 className="text-2xl font-bold">{exp.title}</h3>
                                    <p className="text-lg text-gray-600">{exp.company} <span className="mx-2">|</span> {exp.years}</p>
                                    <p className="mt-2 text-gray-600">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default Template2;

