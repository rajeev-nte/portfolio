import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

// --- Icon Components for UI enhancement ---
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const CodeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>;
const BriefcaseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const TemplateIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>;
const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>;
const TrashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 hover:text-red-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;


const PortfolioForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        bio: '',
        skills: '',
        projects: [{ title: '', description: '', link: '' }],
        experience: [{ title: '', company: '', years: '', description: '' }],
        template: 'template1'
    });
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const fetchPortfolio = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/api/portfolios/${id}`);
                    const { fullName, email, bio, skills, projects, experience, template } = response.data;
                    setFormData({
                        fullName,
                        email,
                        bio,
                        skills: skills.join(', '),
                        projects: projects.length ? projects : [{ title: '', description: '', link: '' }],
                        experience: experience.length ? experience : [{ title: '', company: '', years: '', description: '' }],
                        template
                    });
                } catch (error) {
                    toast.error('Could not fetch portfolio data.');
                    console.error('Error fetching portfolio data:', error);
                }
            };
            fetchPortfolio();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDynamicChange = (index, section, e) => {
        const { name, value } = e.target;
        const list = [...formData[section]];
        list[index][name] = value;
        setFormData({ ...formData, [section]: list });
    };

    const addDynamicField = (section) => {
        if (section === 'projects') {
            setFormData({ ...formData, projects: [...formData.projects, { title: '', description: '', link: '' }] });
        } else if (section === 'experience') {
            setFormData({ ...formData, experience: [...formData.experience, { title: '', company: '', years: '', description: '' }] });
        }
    };

    const removeDynamicField = (index, section) => {
        const list = [...formData[section]];
        list.splice(index, 1);
        setFormData({ ...formData, [section]: list });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const portfolioData = {
            ...formData,
            skills: formData.skills.split(',').map(skill => skill.trim()),
        };

        const promise = () => {
            if (id) {
                return axios.post(`http://localhost:5000/api/portfolios/update/${id}`, portfolioData);
            }
            return axios.post('http://localhost:5000/api/portfolios/add', portfolioData);
        };

        toast.promise(
            promise().then(res => {
                const portfolioId = id || res.data;
                setTimeout(() => navigate(`/preview/${portfolioId}`), 500);
            }),
            {
              pending: 'Saving portfolio...',
              success: 'Portfolio saved successfully! 👌',
              error: 'Something went wrong! 🤯'
            }
        );
    };

    return (
        <div className="max-w-5xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-100">
             <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight">{id ? 'Refine Your Portfolio' : 'Create Your Masterpiece'}</h1>
                <p className="text-gray-500 mt-3 text-lg">Fill in the details below to generate a professional portfolio.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Details */}
                <div className="p-6 bg-gray-50/70 rounded-xl border border-gray-200">
                    <h2 className="text-xl font-semibold mb-5 text-gray-700 flex items-center"><UserIcon/> Personal Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" required className="p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" />
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" required className="p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" />
                    </div>
                    <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="A short bio about yourself..." required rows="4" className="mt-6 w-full p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"></textarea>
                </div>

                {/* Skills */}
                <div className="p-6 bg-gray-50/70 rounded-xl border border-gray-200">
                    <h2 className="text-xl font-semibold mb-5 text-gray-700 flex items-center"><CodeIcon/> Skills</h2>
                    <input type="text" name="skills" value={formData.skills} onChange={handleChange} placeholder="e.g., React, Node.js, CSS (comma separated)" required className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" />
                </div>

                {/* Projects */}
                <div className="p-6 bg-gray-50/70 rounded-xl border border-gray-200">
                    <div className="flex justify-between items-center mb-5">
                        <h2 className="text-xl font-semibold text-gray-700 flex items-center"><BriefcaseIcon/> Projects</h2>
                        <button type="button" onClick={() => addDynamicField('projects')} className="flex items-center bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors shadow-sm">
                            <PlusIcon/> Add
                        </button>
                    </div>
                    <div className="space-y-4">
                        {formData.projects.map((project, index) => (
                            <div key={index} className="p-4 border border-gray-300/80 rounded-lg bg-white relative">
                                <div className="grid grid-cols-1 gap-4">
                                    <input type="text" name="title" value={project.title} onChange={e => handleDynamicChange(index, 'projects', e)} placeholder="Project Title" required className="p-3 border rounded-md"/>
                                    <textarea name="description" value={project.description} onChange={e => handleDynamicChange(index, 'projects', e)} placeholder="Project Description" required className="p-3 border rounded-md" rows="3"></textarea>
                                    <input type="text" name="link" value={project.link} onChange={e => handleDynamicChange(index, 'projects', e)} placeholder="Project Link (Optional)" className="p-3 border rounded-md"/>
                                </div>
                               {formData.projects.length > 1 && <button type="button" onClick={() => removeDynamicField(index, 'projects')} className="absolute top-3 right-3"><TrashIcon/></button>}
                            </div>
                        ))}
                    </div>
                </div>

                 {/* Experience */}
                 <div className="p-6 bg-gray-50/70 rounded-xl border border-gray-200">
                    <div className="flex justify-between items-center mb-5">
                        <h2 className="text-xl font-semibold text-gray-700 flex items-center"><BriefcaseIcon/> Experience</h2>
                        <button type="button" onClick={() => addDynamicField('experience')} className="flex items-center bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors shadow-sm">
                            <PlusIcon/> Add
                        </button>
                    </div>
                    <div className="space-y-4">
                        {formData.experience.map((exp, index) => (
                            <div key={index} className="p-4 border border-gray-300/80 rounded-lg bg-white relative">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input type="text" name="title" value={exp.title} onChange={e => handleDynamicChange(index, 'experience', e)} placeholder="Job Title" required className="p-3 border rounded-md"/>
                                    <input type="text" name="company" value={exp.company} onChange={e => handleDynamicChange(index, 'experience', e)} placeholder="Company" required className="p-3 border rounded-md"/>
                                    <input type="text" name="years" value={exp.years} onChange={e => handleDynamicChange(index, 'experience', e)} placeholder="Years (e.g., 2020-2022)" required className="md:col-span-2 p-3 border rounded-md"/>
                                    <textarea name="description" value={exp.description} onChange={e => handleDynamicChange(index, 'experience', e)} placeholder="Job Description" className="md:col-span-2 p-3 border rounded-md" rows="3"></textarea>
                                </div>
                                {formData.experience.length > 1 && <button type="button" onClick={() => removeDynamicField(index, 'experience')} className="absolute top-3 right-3"><TrashIcon/></button>}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Template Selection */}
                <div className="p-6 bg-gray-50/70 rounded-xl border border-gray-200">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center"><TemplateIcon/> Choose a Template</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div onClick={() => setFormData(prev => ({...prev, template: 'template1'}))} className={`cursor-pointer border-2 p-4 rounded-lg transition-all ${formData.template === 'template1' ? 'border-indigo-500 shadow-md scale-105' : 'border-gray-200 hover:border-indigo-300'}`}>
                            <h3 className="font-semibold text-lg text-gray-700 text-center">Modern & Clean</h3>
                        </div>
                        <div onClick={() => setFormData(prev => ({...prev, template: 'template2'}))} className={`cursor-pointer border-2 p-4 rounded-lg transition-all ${formData.template === 'template2' ? 'border-indigo-500 shadow-md scale-105' : 'border-gray-200 hover:border-indigo-300'}`}>
                            <h3 className="font-semibold text-lg text-gray-700 text-center">Classic Professional</h3>
                        </div>
                    </div>
                </div>


                <button type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-lg text-lg font-bold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-300">
                    {id ? 'Update & Preview' : 'Create & Preview'}
                </button>
            </form>
        </div>
    );
};

export default PortfolioForm;

