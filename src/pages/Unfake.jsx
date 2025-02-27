import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { auth } from "../firebaseConfig"; // Import Firebase authentication
import "./Unfake.css";

const Unfake = () => {
    const navigate = useNavigate();
    const vmConRef = useRef(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check authentication status when component mounts
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setIsAuthenticated(!!user);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        setTimeout(() => {
            const introElement = document.querySelector(".UnfakeIntro1");
            if (introElement) {
                introElement.classList.add("show");
            }
        }, 210);
    }, []);

    const scrollToReadMore = () => {
        if (vmConRef.current) {
            vmConRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const toDownloads = () => {
        if (isAuthenticated) {
            navigate("/downloads");
        } else {
            alert("Please Sign In or Sign Up first.");
            navigate("/signin");
        }
    };

    return (
        <div className="UnfakeCon">
            <div className="UnfakeIntro">
                <div className="VideoCon">
                    <video autoPlay loop muted playsInline className="SSVideoBG">
                        <source src="/SSVid.mp4" type="video/mp4" />
                    </video>
                </div>
                <div className="UnfakeIntro1">
                    <img src="./Logo.png" alt="Unfake Logo" className="UnfakePageLogo" />
                    <div className="IntroCon">
                        <div className="UnfakeIntroDes">
                            <h1 className="UnWelcome">Welcome.</h1>
                            <p className="UnSlogan">
                                Detecting fake news with AI, Blockchain, and Crowdsourcing Methodologies.
                            </p>
                        </div>
                        <div className="IntroBtns">
                            <button className="UnfakeBtn" onClick={scrollToReadMore}>
                                More About Us
                            </button>
                            <button className="UnfakeBtn" onClick={toDownloads}>
                                Download Unfake
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="VMCon" ref={vmConRef}>
                <div className="VisionCon">
                    <h1 className="VisionT">Vision</h1>
                    <p>
                        To suppress the consumption of fake news worldwide, our team proposes a fake news detection web 
                        extension tool called Unfake. This tool was inspired by our seniors’ tool, MassCheck, whose foundation 
                        was built on blockchain technology, artificial intelligence (AI), and crowdsourcing to detect fake news on Twitter.
                        Unfake, which aims to be version 2 of MassCheck, will use our industry client, ProximaX’s blockchain technology, 
                        artificial intelligence technology, and crowdsourcing methodologies as its building blocks.
                    </p>
                </div>
                <div className="MissionCon">
                    <h1 className="MissionT">Mission</h1>
                    <p>
                        To realise our Vision, our Team created a news authenticator known as the Checked algorithm which produces 
                        an authenticity score for each news submitted by Unfake users. The Checked algorithm works by combining the results 
                        of a fake news detection model and crowdsourcing, where users are tasked to vote whether the news is ‘Real’, ‘Uncertain’, 
                        or ‘Fake’. Unlike our predecessor, where 30% and 70% of scores come from the fake news detection model and crowdsourcing 
                        respectively, Unfake's Checked Algorithm aims to improve the accuracy of the authenticity score by providing flexibility 
                        through continuous automated tuning of the two processes.
                    </p>
                </div>
            </div>

            {/* Articles Section */}
            <div className="ArticlesSecCon">
                <h1 className="UnfakeArtT">Articles about Fake News</h1>
                <div className="ArticlesSection">
                    <div className="Article">
                        <img 
                            src="https://ichef.bbci.co.uk/news/800/cpsprodpb/d9c2/live/89deee90-9965-11ef-9260-19e6a950e830.png.webp" 
                            className="FNPic" 
                            alt="FBI issues warning over two fake election videos"
                        />
                        <h1 className="ArtT">FBI issues warning over two fake election videos</h1>
                        <p className="ArtP">By: Olga Robinson, Shayan Sardarizadeh, and Mike Wendling</p>
                        <a href="https://www.bbc.com/news/articles/cly2qjel083o"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="Art">
                            Read More
                        </a>
                    </div>

                    <div className="Article">
                        <img 
                            src="https://fbe.unimelb.edu.au/__data/assets/image/0011/3347192/varieties/medium.jpg" 
                            className="FNPic" 
                            alt="Fake News in the Age of COVID-19"
                        />
                        <h1 className="ArtT">Fake News in the Age of COVID-19</h1>
                        <p className="ArtP">By: Dr. Greg Nyilasy, University of Melbourne</p>
                        <a href="https://fbe.unimelb.edu.au/newsroom/fake-news-in-the-age-of-covid-19"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="Art">
                            Read More
                        </a>
                    </div>

                    <div className="Article">
                        <img 
                            src="https://insights.taylorandfrancis.com/wp-content/uploads/2024/05/shorthand/240/9pidPO9Psz/assets/TgGvqeJd6y/propaganda-poster-3091x2318.webp" 
                            className="FNPic" 
                            alt="Misinformation vs. disinformation, what are the differences?"
                        />
                        <h1 className="ArtT">Misinformation vs. Disinformation, what are the differences?</h1>
                        <p className="ArtP">By: Taylor & Francis</p>
                        <a href="https://insights.taylorandfrancis.com/social-justice/misinformation-vs-disinformation/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="Art">
                            Read More
                        </a>
                    </div>

                    <div className="Article">
                        <img 
                            src="https://storage.googleapis.com/gweb-uniblog-publish-prod/original_images/International_Fact_Check_Day_1.png" 
                            className="FNPic" 
                            alt="4 ways to use Search to check facts, images, and sources online"
                        />
                        <h1 className="ArtT">4 ways to use Search to check facts, images, and sources online</h1>
                        <p className="ArtP">By: Nidhi Hebbar</p>
                        <a href="https://www.keepitrealonline.govt.nz/youth/misinformation/how-to-research-online#:~:text=Use%20websites%20like%20factcheck.org,rumour%20or%20an%20urban%20myth."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="Art">
                            Read More
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Unfake;
