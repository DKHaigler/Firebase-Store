import { User } from "firebase/auth";
import { useState } from "react";
import { SlidingToggle } from "../../Components/UI/ViewToggle/ViewToggle";
import { getGreeting } from "../../Components/Utils/Greeting";
import { TeamView } from "./TeamView";
import { ProjectView } from "./ProjectView";
import './HomePage.css'


const HomePage = () => {
  const [view, setView] = useState("team");
  return (
  <div className="home">
    <div className="home__header">
      <div className="greeting__container">
        <h2>{getGreeting()}</h2>
        <p>Here's what your team is working on</p>
      </div>
      <SlidingToggle
        value={view}
        onChange={setView}
        options={[
          { label: "Teams", value: "team" },
          { label: "Projects", value: "project" },
        ]}
      />
    </div>
    {view === 'team' ? (
      <TeamView/>
    ) : (
      <ProjectView/>
    )
    }

    
    
    
  </div>
  )
};

export default HomePage;