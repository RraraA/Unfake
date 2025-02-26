import { useNavigate } from "react-router-dom";
import "./Terms.css";

const Terms = () => {
    const navigate = useNavigate();
    return (
        <div className="TermsCon">
            <h1>Terms and Conditions</h1>
            <div className="TermsConCon">
                <p>Last updated: February 26, 2025</p><br />
                <p>These Terms and Conditions outline the rules and regulations for the use of Unfake's Service. By accessing this website, we assume you accept these Terms and Conditions. Do not continue to use Unfake if you do not agree to all of the Terms and Conditions stated on this page.</p>
                
                {/* Section 1 */}
                <div className="Policies">
                    <hr className="Line" />
                    <br /><h2>1. Interpretation and Definitions</h2><br />
                    <p>The following definitions shall apply to these Terms and Conditions:</p>
                    <p><strong>a. Account - </strong> A unique account created for You to access our Service.</p><br />
                    <p><strong>b. Company - </strong> (referred to as "the Company", "We", "Us" or "Our" in this Agreement) refers to Unfake.</p><br />
                    <p><strong>c. Service - </strong> Refers to the Website accessible from <a href="https://unfake.info" rel="external nofollow noopener" target="_blank" className="UnfakeInfoLink">https://unfake.info</a> or the downloadable Extension tool (Available on the "Downloads" page)</p><br />
                    <p><strong>d. You - </strong> Means the individual accessing the Service, or the company or other legal entity on behalf of which such individual is accessing or using the Service.</p><br />
                </div>
                
                {/* Section 2 */}
                <div className="Policies">
                    <hr className="Line" />
                    <br /><h2>2. Use of Our Service</h2><br />
                    <p>You agree to use our Service only for lawful purposes and in a manner that does not infringe the rights or restrict the use of the Service by others.</p><br />
                    <p>Prohibited activities include:</p>
                    <p>
                        <li>Engaging in fraudulent or illegal activities.</li>
                        <li>Disrupting or attempting to disrupt the proper operation of the Service.</li>
                        <li>Using the Service to distribute spam or malicious software.</li>
                    </p>
                </div>
                
                {/* Section 3 */}
                <div className="Policies">
                    <hr className="Line" />
                    <br /><h2>3. Termination</h2><br />
                    <p>We may terminate or suspend your access immediately, without prior notice, for any breach of these Terms and Conditions.</p><br />
                </div>
                
                {/* Section 4 */}
                <div className="Policies">
                    <hr className="Line" />
                    <br /><h2>4. Liability and Disclaimer</h2><br />
                    <p>The Company shall not be held liable for any damages resulting from the use of this Service. The Service is provided "as is" without any warranties.</p><br />
                </div>
                
                {/* Section 5 */}
                <div className="Policies">
                    <hr className="Line" />
                    <br /><h2>5. Changes to These Terms</h2><br />
                    <p>We reserve the right to modify or replace these Terms at any time. We will notify You of any changes by posting the updated Terms on this page.</p><br />
                </div>
                
                {/* Section 6 */}
                <div className="Policies">
                    <hr className="Line" />
                    <br /><h2>6. Governing Law</h2><br />
                    <p>These Terms shall be governed and construed in accordance with the laws of Malaysia, without regard to its conflict of law provisions.</p><br />
                </div>
                
                {/* Section 7 */}
                <div className="Policies">
                    <hr className="Line" />
                    <br /><h2>7. Contact Us</h2><br />
                    <p>If you have any questions about these Terms and Conditions, you can contact us via email:</p>
                    <p><a href="mailto:unfake2024@gmail.com" className="ContactLink">unfake2024@gmail.com</a></p>
                </div>
            </div>
            <button type="button" className="TermsBackBtn" onClick={() => navigate(-1)}>Back</button>
        </div>
    );
};

export default Terms;
