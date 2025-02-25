import { useNavigate } from "react-router-dom";
import "./Privacy.css";

const Privacy = () => {
    const navigate = useNavigate();
    return (
        <div className="PrivacyCon">
            <h1 className="PrivT">Privacy Policy</h1>
            <p className="PrivContent">
                <strong>1. Introduction</strong><br />Unfake is a browser extension designed to help users fact-check misinformation on the social media platform X. This fact-checking solution was created by five Computer Science students from Taylor's University as their final year project. The fact-checking algorithm, Checked Algorithm, utilizes AI, blockchain, and crowdsourcing methodologies to determine the legitimacy of news tweets. Since crowd opinions are considered by the Checked Algorithm, this Privacy Policy explains how Unfake handles user data.<br />
                <br /><strong>2. Data Collection & Storage</strong><br />When users sign up to use Unfake's functionalities, they are required to provide information such as their email address and password for security authentication and data protection purposes. The information collected by Unfake, including user voting feedback and preferences, is stored locally in Unfake's database or Chrome’s storage API. No data is transmitted to external servers, third parties, or external services.<br />
                <br /><strong>3. How We Use Your Data</strong><br />Voting feedback is stored locally solely to improve the user experience. The stored data does not contain personal or sensitive user information. No collected data is used for tracking, advertising, or analytics.<br />
                <br /><strong>4. Data Sharing & Third Parties</strong><br />We do not share, sell, or transfer any data to third parties. Since all data is stored locally in Unfake's database and the Chrome extension, no external servers have access to Unfake's user information.<br />
                <br /><strong>5. Security & Data Protection</strong><br />Unfake's database stores only passwords, email addresses, or personally identifiable information voluntarily submitted by users. The collected data is used exclusively for security and authentication purposes.<br />
                <br /><strong>6. Changes to This Privacy Policy</strong><br />If Unfake (including the extension) changes how it handles data, this Privacy Policy will be updated accordingly. Users will be notified of any significant changes.<br />
            </p>
            <button type="button" className="PrivBackBtn" onClick={() => navigate(-1)}>Back</button>
        </div>
    );
};
export default Privacy;