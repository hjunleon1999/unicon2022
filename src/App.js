import logo from "./logo.svg";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Agenda from "./pages/agenda/Agenda"
import Pricing from "./pages/pricing/Pricing";
import ContactUsPage from "./pages/contact-us/ContactUs";
import SpeakersPage from "./pages/speakers/SpeakersPage";
import TigerLaunchPage from "./pages/tigerlaunch/Tigerlaunch";
import PrivacyPage from "./pages/privacy/PrivacyPage";
import TermsOfUsePage from "./pages/terms-of-use/TermsOfUse";
import TestShootStars from "./pages/test/testShootingStars/TestShootStars";
import "./App.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path = "/">
          <Home />
        </Route>
        <Route path ="/about">
          <About />
        </Route>
        <Route path ="/agenda">
          <Agenda />
        </Route>
        <Route path ="/pricing">
          <Pricing />
        </Route>
        <Route path ="/tigerlaunch">
          <TigerLaunchPage />
        </Route>
        <Route path ="/contact">
          <ContactUsPage />
        </Route>
        <Route path ="/speakers">
          <SpeakersPage />
        </Route>
        <Route path ="/privacy">
          <PrivacyPage />
        </Route>
        <Route path="/terms">
          <TermsOfUsePage />
        </Route>
        
        <Route path = "/TestShootingStars">
          <TestShootStars />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
