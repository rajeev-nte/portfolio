// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import Template1 from '../templates/Template1';
// import Template2 from '../templates/Template2';
// import { toast } from 'react-toastify';


// // --- Icon Components ---
// const EditIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z" /></svg>;
// const LinkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>;


// const PortfolioPreview = ({ id }) => {
//     const [portfolioData, setPortfolioData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const previewRef = useRef(null);

//     useEffect(() => {
//         if (id) {
//             axios.get(`http://localhost:5000/api/portfolios/${id}`)
//                 .then(response => {
//                     setPortfolioData(response.data);
//                     setLoading(false);
//                 })
//                 .catch(err => {
//                     console.error("Error fetching portfolio:", err);
//                     setError('Could not load portfolio data.');
//                     setLoading(false);
//                 });
//         }
//     }, [id]);

//     const handleCopyLink = () => {
//         const url = window.location.href;
//         navigator.clipboard.writeText(url).then(() => {
//             toast.success('Link copied to clipboard!');
//         }, () => {
//             toast.error('Failed to copy link.');
//         });
//     };

//     if (loading) return <p className="text-center text-gray-600 text-lg">Loading Preview...</p>;
//     if (error) return <p className="text-center text-red-500 font-semibold">{error}</p>;
//     if (!portfolioData) return <p className="text-center text-gray-600">No portfolio data found.</p>;

//     const renderTemplate = () => {
//         switch (portfolioData.template) {
//             case 'template1':
//                 return <Template1 data={portfolioData} />;
//             case 'template2':
//                 return <Template2 data={portfolioData} />;
//             default:
//                 return <Template1 data={portfolioData} />;
//         }
//     };

//     return (
//         <div>
//             <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
//                 <div>
//                     <h1 className="text-4xl font-bold text-gray-800 tracking-tight">Live Preview</h1>
//                     <p className="text-gray-500 mt-1">This is how your portfolio will appear to others.</p>
//                 </div>
//                 <div className="flex gap-3">
//                     <button onClick={handleCopyLink} className="flex items-center bg-white text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-100 transition-colors border border-gray-300 shadow-sm font-semibold">
//                         <LinkIcon />
//                         Copy Link
//                     </button>
//                     <Link to={`/edit/${id}`} className="flex items-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md font-semibold">
//                         <EditIcon />
//                         Edit
//                     </Link>
//                 </div>
//             </div>
//             <div id="portfolio-preview" ref={previewRef} className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
//                 {renderTemplate()}
//             </div>
//         </div>
//     );
// };

// export default PortfolioPreview;
//................................................................

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Template1 from '../templates/Template1';
import Template2 from '../templates/Template2';
import { toast } from 'react-toastify';


// --- Icon Components ---
const EditIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z" /></svg>;
const LinkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>;
const NewPageIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>;


const PortfolioPreview = ({ id }) => {
    const [portfolioData, setPortfolioData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const previewRef = useRef(null);

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:5000/api/portfolios/${id}`)
                .then(response => {
                    setPortfolioData(response.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Error fetching portfolio:", err);
                    setError('Could not load portfolio data.');
                    setLoading(false);
                });
        }
    }, [id]);

    const handleCopyLink = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            toast.success('Link copied to clipboard!');
        }, () => {
            toast.error('Failed to copy link.');
        });
    };

    if (loading) return <p className="text-center text-gray-600 text-lg">Loading Preview...</p>;
    if (error) return <p className="text-center text-red-500 font-semibold">{error}</p>;
    if (!portfolioData) return <p className="text-center text-gray-600">No portfolio data found.</p>;

    const renderTemplate = () => {
        switch (portfolioData.template) {
            case 'template1':
                return <Template1 data={portfolioData} />;
            case 'template2':
                return <Template2 data={portfolioData} />;
            default:
                return <Template1 data={portfolioData} />;
        }
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-4xl font-bold text-gray-800 tracking-tight">Live Preview</h1>
                    <p className="text-gray-500 mt-1">This is how your portfolio will appear to others.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <a href={`http://localhost:5000/api/portfolios/render/${id}`} target="_blank" rel="noopener noreferrer" className="flex items-center bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition-colors shadow-sm font-semibold">
                        <NewPageIcon />
                        Open Standalone
                    </a>
                    <button onClick={handleCopyLink} className="flex items-center bg-white text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-100 transition-colors border border-gray-300 shadow-sm font-semibold">
                        <LinkIcon />
                        Copy Link
                    </button>
                    <Link to={`/edit/${id}`} className="flex items-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md font-semibold">
                        <EditIcon />
                        Edit
                    </Link>
                </div>
            </div>
            <div id="portfolio-preview" ref={previewRef} className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                {renderTemplate()}
            </div>
        </div>
    );
};

export default PortfolioPreview;



