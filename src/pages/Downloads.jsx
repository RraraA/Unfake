import { useState, useRef } from "react";
import "./Downloads.css";

const Downloads = () => {
  const userGuideRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(0); // Track current step in User Guide

  const scrollToUserGuide = () => {
    if (userGuideRef.current) {
      userGuideRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Steps for the User Guide
  const userGuideSteps = [
    {
      title: (<h1 className="Title">Step 1: Download Unfake</h1>),
      content: (
        <div className="FCG">
          <p><br />
            - Click on the “Download” button above. <br />
            <div>
              - Visit "chrome://extensions/"
              <button
                onClick={() => {
                  navigator.clipboard.writeText("chrome://extensions/");
                  alert("Copied! Paste it into your Chrome address bar.");
                }}
                className="copyBtn"
              >Copy Link</button>
            </div>
            - Turn on "Developer Mode" on the top right corner of your screen. <br />
            - Click on "Load Unpack", then find and select your downloaded Unfake File. <br />
            - The Unfake Extension should now appear.
          </p>
          <div className="Pics">
            <img src="/DownloadPics/0A.png" className="GuideImage0a"/>
            <img src="/DownloadPics/0B.png" className="GuideImage0b" />
          </div>
        </div>
      )
    },
    {
      title: (<h1 className="Title">Step 2: Activate Unfake</h1>),
      content: (
        <div className="FCG">
          <p><br />
            - Navigate "Unfake" and turn on the toggle for Unfake.
          </p>
            <img src="/DownloadPics/1B.png" className="GuideImage1b" />
        </div>
      )
    },
    {
      title: (<h1 className="Title">Step 3: Activate Unfake on X</h1>),
      content: (
        <div className="FCG">
          <p><br />
            - Visit X by clicking “X” on the navigation bar.<br />
            - Click the "Puzzle" icon → Select Unfake.
            - Turn on the "Overlay" toggle for Unfake.
            - Please Sign in to use Unfake.
          </p>
          <div className="Pics">
            <img src="/DownloadPics/2A.png" className="GuideImage2a"/>
            <img src="/DownloadPics/2B.png" className="GuideImage2c" />
            <img src="/DownloadPics/2C.png" className="GuideImage2c" />
            </div>
        </div>
      )
    },
    {
      title: (<h1 className="Title">Step 4: Using Unfake</h1>),
      content: (
        <div className="FCG">
          <p><br />
            <strong>Scenario A: Tweet with submission history</strong><br />
            - If the toggle is on, users can view the voting section.<br />
            - Users can then participate in fact-checking immediately. <br />
          </p>
          <img src="/DownloadPics/3A.png" className="GuideImage3a" />
          <img src="/DownloadPics/3B.png" className="GuideImage3b" />
          <p>
            <br /><strong>Scenario B: Tweet with No submission history</strong><br />
            - On the X post, users should locate the the "share" button and copy the Tweet Link. <br />
            - Users can then paste the Tweet Link in the space provided by the Unfake Extension's Pop-Up box. <br />
            - Upon submission, users should view the voting section below the X post.
          </p>
          <div className="Pics">
            <img src="/DownloadPics/3C.png" className="GuideImage3c" />
            <img src="/DownloadPics/3D.png" className="GuideImage3d" />
          </div>
          <div className="Pics">
            <img src="/DownloadPics/3E.png" className="GuideImage3e" />
            <img src="/DownloadPics/3A.png" className="GuideImage3a" />
          </div>
        </div>
      ),
    },
    {
      title: (<h1 className="Title">Step 5: Checked Algorithm Score</h1>),
      content: (
        <div className="FCG">
          <p><br />
            - Locate to Unfake's "Accounts" page and click on "All Post History".<br />
            - Paste your post link to retrieve the lastest Transaction Hash, which you should copy. <br />
            - Click on "Sirius Explorer", then paste your copied Transation Hash to search for your Checked Algorithm Score on ProximaX's Sirius Explorer. 
          </p>
          <div className="Pics">
            <img src="/DownloadPics/4.png" className="GuideImage4" />
          </div>
        </div>
      ),
    },
    {
      title: (<h1 className="Title">Step 6: Disabling Unfake</h1>),
      content: (
        <div className="FCG">
          <p><br />
            - Locate to the "Puzzle" icon again on the top-right corner.<br />
            - Click on Unfake.
            - Turn off the "Overlay" toggle to disable Unfake.
          </p>
          <img src="/DownloadPics/5.png" className="GuideImage5" />
        </div>
      )
    }
  ];

  // Navigation functions
  const nextStep = () => {
    if (currentStep < userGuideSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="DownCon">
      <div className="VideoCon">
        <video autoPlay loop muted playsInline className="SSVideoBG">
        <source src="/SSVid.mp4" type="video/mp4"/></video>
      </div>
      <div className="DownUnfakeBg">
        <img src="./Logo.png" alt="Downloads Unfake Logo" className="UnfakeLogo" />
        <p className="UnfakeDes">
          Detecting Fake News on X using AI, Crowdsourcing, and Blockchain Methodologies.
        </p>

        <a href="https://github.com/RraraA/UnfakeEx/archive/refs/heads/ExCP.zip" download>
          <button className="DownloadBtn">Download Unfake</button>
          </a>

        <div className="ToUserGuide">
          <p>Learn how to use Unfake</p>
          <button className="HereBtn" onClick={scrollToUserGuide}>Here</button>
        </div>
      </div>

      {/* User Guide Section (Only this part changes) */}
      <div ref={userGuideRef} className="UserGuideCon">
        <h1>{userGuideSteps[currentStep].title}</h1>
        <div className="UserGuideStep">
          {userGuideSteps[currentStep].image && (
            <img src={userGuideSteps[currentStep].image} alt="Step Image" className="GuideImage" />
          )}
          {userGuideSteps[currentStep].content}
        </div>

        {/* Navigation Buttons */}
        <div className="UserGuideNav">
          <button className="DownPrevBtn" onClick={prevStep} disabled={currentStep === 0}>
            Previous
          </button>
          <span className="StepCounter">{currentStep + 1} / {userGuideSteps.length}</span>
          <button className="DownNextBtn" onClick={nextStep} disabled={currentStep === userGuideSteps.length - 1}>
            Next
          </button>
        </div>
      </div>
      
      {/* Article Section */}
      <div className="FCGArtSec">
        <h1 className="DownArtT">How to Fact Check?</h1>
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
