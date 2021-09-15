import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';

// CSS
import './App.css';

// Contexts
import { ThemeProvider } from './contexts/Theme';
import { LanguageProvider } from './contexts/Language';
import { UserProvider } from './contexts/User'

// Components & Pages

import NotFound from './pages/NotFound'
import WhyKatrade from './pages/Why-Katrade';

import Home from './pages/Home';
import Market from './pages/Market';

import Search from './pages/Search'

import Product from './pages/Product';

import SignIn from './pages/Signin';
import SignUp from './pages/SignUp';

import { Verify, VerifyEmailSuccess, VerifyEmailPending, SetUsernamePage } from './pages/VerifyPages/VerifyTest';

import Account from './pages/AccountPages/Account';
import Favorite from './pages/AccountPages/Favorite';
import Following from './pages/AccountPages/Following';
import Follower from './pages/AccountPages/Follower';
import History from './pages/AccountPages/History';
import Inventory from './pages/AccountPages/Inventory';
import ManageInventory from './pages/AccountPages/ManageInventory';
import AddItem from './pages/AccountPages/AddItem';
import EditItem from './pages/AccountPages/EditItem';

import ChangePassword from './pages/AccountPages/ChangePasswordPage';
import Profile from './pages/AccountPages/Profile';

import Request from './pages/RequestPending/Request'
import Pending from './pages/RequestPending/Pending'
import Inprogress from './pages/RequestPending/Inprogress'

import ProfileCanvas from './components/ProfileCanvas';

import Test01 from './components/TestFrontend/Test01';


require('dotenv').config({ path: ".env" })
console.log(process.env)

function App() {

    return (
        <>
            <UserProvider>
                <LanguageProvider>
                    <ThemeProvider>
                        <Router>
                            <Switch>

                                {/* <Route exact path="/test" component={}></Route> */}

                                {/* Add path here!!  */}

                                {/* Articles and static pages */}
                                <Route exact path="/articles/about/developers" component={ProfileCanvas}></Route>
                                <Route exact path="/articles/why-katrade" component={WhyKatrade}></Route>

                                <Route exact path="/app/signin" component={SignIn}></Route>
                                <Route exact path="/app/profile" component={Profile}></Route>
                                <Route exact path="/app/register" component={SignUp}></Route>
                                <Route exact path="/app/changepassword" component={ChangePassword}></Route>

                                <Route exact path="/app/verify/pending" component={VerifyEmailPending}></Route>
                                <Route exact path="/app/verify/success" component={VerifyEmailSuccess}></Route>
                                <Route exact path="/verify" component={Verify}></Route>

                                <Route exact path="/app/market" component={Market}></Route>
                                <Route exact path="/app/search/:quote" component={Search}></Route>
                                <Route exact path="/app/product" component={Product}></Route>

                                <Route exact path="/app/setup" component={SetUsernamePage}></Route>
                                <Route exact path="/app/account" component={Account}></Route>
                                <Route exact path="/app/favorite" component={Favorite}></Route>
                                <Route exact path="/app/following" component={Following}></Route>
                                <Route exact path="/app/followers" component={Follower}></Route>
                                <Route exact path="/app/history" component={History}></Route>
                                <Route exact path="/app/inventory" component={Inventory}></Route>
                                <Route exact path="/app/manageinventory" component={ManageInventory}></Route>

                                <Route exact path="/app/additem" component={AddItem}></Route>
                                <Route exact path="/app/edititem" component={EditItem}></Route>

                                <Route exact path="/app/request" component={Request}></Route>
                                <Route exact path="/app/pending" component={Pending}></Route>
                                <Route exact path="/app/inprogress" component={Inprogress}></Route>

                                <Route exact path="/app/testFrontend" component={Test01}></Route>

                                <Route exact path="/404" component={NotFound}></Route>
                                <Route exact path="/" component={Home}></Route>
                                <Route><Redirect to="/404" /></Route>
                            </Switch>
                        </Router>
                    </ThemeProvider>
                </LanguageProvider>
            </UserProvider>
        </>
    );
}

export default App;
