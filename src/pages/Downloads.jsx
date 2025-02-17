import "./Downloads.css";
import { useRef } from "react";

const Downloads = () => {
  const userGuideRef = useRef(null);

  const scrollToUserGuide = () => {
    if (userGuideRef.current) {
      userGuideRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="DownCon">
      <div className="DownUnfakeBg">
        <img src="./Logo.png" alt="Downloads Unfake Logo" className="UnfakeLogo" /> 
        <p className="UnfakeDes">Detecting Fake News on X using AI, Crowdsourcing, and Blockchain Methodologies.</p>
        
        <button className="DownloadBtn">Download</button>
        
        <div className="ToUserGuide">
          <p>Learn how to use Unfake</p>
          <button className="HereBtn" onClick={scrollToUserGuide}>Here</button>
        </div>
      </div>
      {/* User Guide Section */}
      <div ref={userGuideRef} className="UserGuideCon">
        <h1>User Guide for Unfake</h1>  
        <div className="UserGuideDesCon">
          <p className="UGD">
            <br /><br /><strong>1. Download Unfake:</strong> <br />
            - Click on the “Download” button directly above. After completion:
            <br />
            - Go to the top-right corner of your screen.
            <br />
            - Click on "New Chrome available" → then "Extensions".
            <br />
            - Turn on the toggle for Unfake.
            <br />
            
            <div className="ImageCon1">
              <div className="GU1">
                <p>a.</p>
                <img src="/DownloadPics/1A.png" alt="Download Unfake" className="GuideImage1a"/>
              </div>
              <div className="GU1">
                <p>b.</p>
                <img src="/DownloadPics/1B.png" alt="Download Unfake" className="GuideImage1b"/>
              </div>
            </div>
            
            <br /><br /><strong>2. On X:</strong> <br />
            - Go to X by clicking “X” on the navigation bar above.
            <br />
            - Visit the top-right corner and click on the puzzle logo.
            <br />
            - Steps: Click “Unfake” → Click the Unfake Logo → Turn on the toggle.
            <br />
            - Now the Unfake Logo should appear on the bottom right of the screen.
            <br />
            
            <div className="ImageCon2">
              <div className="GU2">
                <p>a.</p>
                <img src="/DownloadPics/2A.png" alt="Download Unfake" className="GuideImage2a"/>
              </div>
              <div className="GU2">
                <p>b.</p>
                <img src="/DownloadPics/2B.png" alt="Download Unfake" className="GuideImage2b"/>
              </div>
              <div className="GU2">
                <p>c.</p>
                <img src="/DownloadPics/2C.png" alt="Download Unfake" className="GuideImage2c"/>
              </div>
            </div>

            <br /><br /><strong>3. Use Unfake:</strong> <br />
            - Click on the Unfake Logo shown on the bottom right of your screen to access Unfake’s fact-checking mechanism.
            <br />

            <br /><br /><strong>4. Unfake Scenarios:</strong> <br />
            Refer to the encountered scenarios, A or B.
            <br /><br /><strong>A. Tweets with prior submission:</strong> <br />
            - Upon clicking the Unfake logo → shows Checked Algorithm, Voting options (Real, Uncertain and Fake) and dropbox for evidence/ references submission below the Tweet. After voting, total votes can be seen by user.
            - Note: Submission of evidence/ references is not compulsory but strongly encouraged.
            <br />
            
            <div className="ImageCon4">
              <div className="GU4">
                <p>a.</p>
                <img src="/DownloadPics/4A.png" alt="Download Unfake" className="GuideImage4a"/>
              </div>
              <div className="GU4">
                <p>b.</p>
                <img src="/DownloadPics/4B.png" alt="Download Unfake" className="GuideImage4b"/>
              </div>
            </div>

            <br /><br /><strong>B. Tweets with NO prior submission:</strong> <br />
            - Upon clicking the Unfake logo →  Checked algorithm, voting options and dropbox for evidence/ reference submission is not shown → users can submit the Tweet Link on our pop up box. After submission, Users should be able to participate in Scenario A.
            <br />
            
            <div className="ImageCon4">
              <div className="GU4">
                <p>a.</p>
                <img src="/DownloadPics/4C.png" alt="Download Unfake" className="GuideImage4c"/>
              </div>
              <div className="GU4">
                <p>b.</p>
                <img src="/DownloadPics/4D.png" alt="Download Unfake" className="GuideImage4d"/>
              </div>
              <div className="GU4">
                <p>c.</p>
                <img src="/DownloadPics/4E.png" alt="Download Unfake" className="GuideImage4e"/>
              </div>
              <div className="GU4">
                <p>d.</p>
                <img src="/DownloadPics/4F.png" alt="Download Unfake" className="GuideImage4f"/>
              </div>
            </div>
            
            <br /><br /><strong>5. Stop Unfake:</strong> <br />
            - Click on the Unfake Logo in the top-right corner.
            <br />
            - Turn off the toggle to disable Unfake.
            <br />

            <div className="ImageCon5">
              <p>a.</p>
              <img src="/DownloadPics/5.png" alt="Download Unfake" className="GuideImage5"/>
            </div>
          </p>
        </div>
      </div>
      <div className="FCGCon">
        <h1 className="FCGT">Fact Check Guide</h1>
        <p className="FCGP">
          Please visit the sites below to learn proper fact-checking techniques. Before participating in voting, consider the following steps:
        </p>
          
        <p className="FCGP">
          <br /><strong>1. Identify the claim:</strong><br />
          - Determine what is being claimed and who is making the claim.
        </p>

        <p className="FCGP">
          <br /><strong>2. Investigate the origin of the claim:</strong><br />
          - Look for primary sources such as government reports, academic papers, or official statements.
        </p>

        <p className="FCGP">
          <br /><strong>3. Verify with reliable sources:</strong><br />
          - Compare the claim with multiple trusted sources, including:
        </p>

        <ul className="FCGList">
          <li>Fact-checking websites (Snopes, PolitiFact, BBC Reality Check).</li>
          <li>Reputable news organizations (BBC, Reuters, Associated Press).</li>
          <li>Government or institutional data (WHO, UN, scientific journals).</li>
        </ul>

        <p className="FCGP">
          <br /><strong>4. Analyze media and visual content:</strong><br />
        </p>

        <ul className="FCGList">
          <li>Are statistics or images manipulated?</li>
          <li>Check metadata such as date, location, and context.</li>
        </ul>

        <p className="FCGP">
          <br /><strong>5. Consider context and possible biases:</strong><br />
        </p>

        <ul className="FCGList">
          <li>Is the language emotional or exaggerated?</li>
          <li>Investigate who benefits from the claim.</li>
        </ul>
      </div>
      {/* Articles Section */}
      <div className="FCGArtSec">
        <h1>Articles</h1>
        <div className="AllArts">
          <div className="Article">
            <img src="https://s3.amazonaws.com/libapps/customers/132/images/How-to-Spot-Fake-News.jpg" className="FNPic" alt="How to Spot Fake News"/>
            <h1 className="ArtT">How to Fact-Check Like a Pro</h1>
            <p className="ArtP">By: The Public Library</p>
            <a href="https://abqlibrary.org/fakenews/factcheck" target="_blank" rel="noopener noreferrer" className="Art">
              Read More
            </a>
          </div>
          <div className="Article">
            <img src="https://globaldevelopmentaldelay.com.au/wp-content/uploads/2022/11/searching-internet.jpg" className="FNPic" alt="Finding Reliable Information"/>
            <h1 className="ArtT">How to Find Reliable and Useful Information on the Internet</h1>
            <p className="ArtP">By: Western Sydney University</p>
            <a href="https://globaldevelopmentaldelay.com.au/helping-you-find-other-resources/reliable-information-internet/" target="_blank" rel="noopener noreferrer" className="Art">
              Read More
            </a>
          </div>
          <div className="Article">
            <img src="https://insights.taylorandfrancis.com/wp-content/uploads/2024/05/shorthand/240/9pidPO9Psz/assets/TgGvqeJd6y/propaganda-poster-3091x2318.webp" className="FNPic" alt="Misinformation vs Disinformation"/>
            <h1 className="ArtT">Misinformation vs. Disinformation: What Are the Differences?</h1>
            <p className="ArtP">By: Taylor & Francis</p>
            <a href="https://insights.taylorandfrancis.com/social-justice/misinformation-vs-disinformation/" target="_blank" rel="noopener noreferrer" className="Art">
                Read More
            </a>
          </div>
          <div className="Article">
            <img src="https://storage.googleapis.com/gweb-uniblog-publish-prod/original_images/International_Fact_Check_Day_1.png" className="FNPic" alt="How to Check Facts"/>
            <h1 className="ArtT">4 Ways to Use Search to Check Facts, Images, and Sources Online</h1>
            <p className="ArtP">By: Nidhi Hebbar</p>
            <a href="https://www.keepitrealonline.govt.nz/youth/misinformation/how-to-research-online#:~:text=Use%20websites%20like%20factcheck.org,rumour%20or%20an%20urban%20myth." target="_blank" rel="noopener noreferrer" className="Art">
                Read More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Downloads;
