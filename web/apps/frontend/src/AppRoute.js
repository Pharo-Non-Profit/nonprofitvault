import { React, useState } from "react";
import 'bulma/css/bulma.min.css';
import './index.css';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import { RecoilRoot } from 'recoil';

// System, Login, Register, Index, etc
import LogoutRedirector from "./Components/Gateway/LogoutRedirector";
import Login from "./Components/Gateway/Login";
import TwoFactorAuthenticationWizardStep1 from "./Components/Gateway/2FA/Step1";
import TwoFactorAuthenticationWizardStep2 from "./Components/Gateway/2FA/Step2";
import TwoFactorAuthenticationWizardStep3 from "./Components/Gateway/2FA/Step3";
import TwoFactorAuthenticationValidateOnLogin  from "./Components/Gateway/2FA/ValidateOnLogin";
import Index from "./Components/Gateway/Index";
import Register from "./Components/Gateway/Register/View";
import TopAlertBanner from "./Components/Misc/TopAlertBanner";
import Sidebar from "./Components/Menu/Sidebar";
import Topbar from "./Components/Menu/Top";
import NotFoundError from "./Components/Misc/NotFoundError";
import NotImplementedError from "./Components/Misc/NotImplementedError";
import ForgotPassword from "./Components/Gateway/ForgotPassword";
import PasswordReset from "./Components/Gateway/PasswordReset";
import AnonymousShareableLink from "./Components/Anonymous/ShareableLink/View";

// Account
import AccountDetail from "./Components/Account/Detail/View";
import AccountTwoFactorAuthenticationDetail from "./Components/Account/2FA/View";
import AccountEnableTwoFactorAuthentication from "./Components/Account/2FA/EnableView";

// Redirectors.
import AnonymousCurrentUserRedirector from "./Components/Misc/AnonymousCurrentUserRedirector";
import TwoFactorAuthenticationRedirector from "./Components/Misc/TwoFactorAuthenticationRedirector";

// Root
import RootDashboard from "./Components/Root/Dashboard";
import RootTenantList from "./Components/Root/Tenant/List";
import RootTenantDetail from "./Components/Root/Tenant/Detail";
import RootTenantUpdate from "./Components/Root/Tenant/Update";
import ToTenantRedirector from "./Components/Root/ToTenantRedirector";

// Admin Dashboard, Help
import AdminDashboard from "./Components/Admin/Dashboard/View";
import AdminDashboardCommentList from "./Components/Admin/Dashboard/Comments/List";
import AdminHelp from "./Components/Admin/Help";

// Admin Users
import AdminUserList from "./Components/Admin/User/List";
import AdminUserSearchResult from "./Components/Admin/User/Search/Result";
import AdminUserSearch from "./Components/Admin/User/Search/Search";
import AdminUserAddStep1PartA from "./Components/Admin/User/Add/Step1PartA";
import AdminUserAddStep1PartB from "./Components/Admin/User/Add/Step1PartB";
import AdminUserAddStep2 from "./Components/Admin/User/Add/Step2";
import AdminUserAddStep3 from "./Components/Admin/User/Add/Step3";
import AdminUserAddStep4 from "./Components/Admin/User/Add/Step4";
import AdminUserAddStep5 from "./Components/Admin/User/Add/Step5";
import AdminUserAddStep6 from "./Components/Admin/User/Add/Step6";
import AdminUserDetailLite from "./Components/Admin/User/DetailLite";
import AdminUserDetailFull from "./Components/Admin/User/DetailFull";
import AdminUserUpdate from "./Components/Admin/User/Update";
import AdminUserDetailCommentList from "./Components/Admin/User/DetailCommentList";
import AdminUserDetailObjectFileList from "./Components/Admin/User/ObjectFile/List";
import AdminUserDetailMore from "./Components/Admin/User/DetailMore";
import AdminUserDeleteOperation from "./Components/Admin/User/Operation/Delete";
import AdminUserArchiveOperation from "./Components/Admin/User/Operation/Archive";
import AdminUserUnarchiveOperation from "./Components/Admin/User/Operation/Unarchive";
import AdminUserUpgradeOperation from "./Components/Admin/User/Operation/Upgrade";
import AdminUserDowngradeOperation from "./Components/Admin/User/Operation/Downgrade";
import AdminUserAvatarOperation from "./Components/Admin/User/Operation/Avatar";
import AdminUserObjectFileAdd from "./Components/Admin/User/ObjectFile/Add";
import AdminUserObjectFileDetail from "./Components/Admin/User/ObjectFile/Detail";
import AdminUserObjectFileUpdate from "./Components/Admin/User/ObjectFile/Update";

// Customer Dashboard
import CustomerDashboard from "./Components/Customer/Dashboard/View";

// Customer Smart Folder
import CustomerSmartFolderList from "./Components/Customer/SmartFolder/List/View";
import CustomerSmartFolderAdd from "./Components/Customer/SmartFolder/Add/View";
import CustomerSmartFolderDetail from "./Components/Customer/SmartFolder/Detail/View";
import CustomerSmartFolderUpdate from "./Components/Customer/SmartFolder/Update/View";
import CustomerSmartFolderDelete from "./Components/Customer/SmartFolder/Delete/View";

// Customer Goverment Document Category
import CustomerDocumentCategoryAllList from "./Components/Customer/DocumentsByCategory/All/List/View";
import CustomerDocumentsByGovernmentCategoryListForCanada from "./Components/Customer/DocumentsByCategory/Government/Canada/List/View";


function AppRoute() {
    return (
        <div class="is-widescreen is-size-5-desktop is-size-6-tablet is-size-7-mobile">
            {/*
                NOTES FOR ABOVE
                USE THE FOLLOWING TEXT SIZES BASED ON DEVICE TYPE
                - is-size-5-desktop
                - is-size-6-tablet
                - is-size-7-mobile
            */}
            <RecoilRoot>
                <Router>
                    <AnonymousCurrentUserRedirector />
                    <TwoFactorAuthenticationRedirector />
                    <TopAlertBanner />
                    <Topbar />
                    <div class="columns">
                        <Sidebar />
                        <div class="column">
                            <section class="main-content columns is-fullheight">
                                <Routes>
                                    <Route exact path="/documents/goverment/canada" element={<CustomerDocumentsByGovernmentCategoryListForCanada/>}/>
                                    <Route exact path="/documents" element={<CustomerDocumentCategoryAllList/>}/>

                                    <Route exact path="/dashboard" element={<CustomerDashboard/>}/>

                                    <Route exact path="/smart-folders" element={<CustomerSmartFolderList/>}/>
                                    <Route exact path="/smart-folders/add" element={<CustomerSmartFolderAdd/>}/>
                                    <Route exact path="/smart-folder/:sfid" element={<CustomerSmartFolderDetail/>}/>
                                    <Route exact path="/smart-folder/:sfid/edit" element={<CustomerSmartFolderUpdate/>}/>
                                    <Route exact path="/smart-folder/:sfid/delete" element={<CustomerSmartFolderDelete/>}/>

                                    <Route exact path="/account" element={<AccountDetail/>}/>
                                    <Route exact path="/account/2fa" element={<AccountTwoFactorAuthenticationDetail/>}/>
                                    <Route exact path="/account/2fa/enable" element={<AccountEnableTwoFactorAuthentication/>}/>

                                    <Route exact path="/admin/user/:cid/downgrade" element={<AdminUserDowngradeOperation/>}/>
                                    <Route exact path="/admin/user/:cid/upgrade" element={<AdminUserUpgradeOperation/>}/>
                                    <Route exact path="/admin/user/:cid/unarchive" element={<AdminUserUnarchiveOperation/>}/>
                                    <Route exact path="/admin/user/:cid/archive" element={<AdminUserArchiveOperation/>}/>
                                    <Route exact path="/admin/user/:cid/permadelete" element={<AdminUserDeleteOperation/>}/>
                                    <Route exact path="/admin/user/:cid/avatar" element={<AdminUserAvatarOperation/>}/>
                                    <Route exact path="/admin/user/:cid/more" element={<AdminUserDetailMore/>}/>
                                    <Route exact path="/admin/user/:cid/attachment/:aid/edit" element={<AdminUserObjectFileUpdate/>}/>
                                    <Route exact path="/admin/user/:cid/attachment/:aid" element={<AdminUserObjectFileDetail/>}/>
                                    <Route exact path="/admin/user/:cid/attachments/add" element={<AdminUserObjectFileAdd/>}/>
                                    <Route exact path="/admin/user/:cid/attachments" element={<AdminUserDetailObjectFileList/>}/>
                                    <Route exact path="/admin/user/:cid/comments" element={<AdminUserDetailCommentList/>}/>
                                    <Route exact path="/admin/user/:cid/edit" element={<AdminUserUpdate/>}/>
                                    <Route exact path="/admin/user/:cid/detail" element={<AdminUserDetailFull/>}/>
                                    <Route exact path="/admin/user/:cid" element={<AdminUserDetailLite/>}/>
                                    <Route exact path="/admin/users/add/step-6" element={<AdminUserAddStep6/>}/>
                                    <Route exact path="/admin/users/add/step-5" element={<AdminUserAddStep5/>}/>
                                    <Route exact path="/admin/users/add/step-4" element={<AdminUserAddStep4/>}/>
                                    <Route exact path="/admin/users/add/step-3" element={<AdminUserAddStep3/>}/>
                                    <Route exact path="/admin/users/add/step-2" element={<AdminUserAddStep2/>}/>
                                    <Route exact path="/admin/users/add/step-1-results" element={<AdminUserAddStep1PartB/>}/>
                                    <Route exact path="/admin/users/add/step-1-search" element={<AdminUserAddStep1PartA/>}/>
                                    <Route exact path="/admin/users/search-result" element={<AdminUserSearchResult/>}/>
                                    <Route exact path="/admin/users/search" element={<AdminUserSearch/>}/>
                                    <Route exact path="/admin/users" element={<AdminUserList/>}/>

                                    <Route exact path="/admin/help" element={<AdminHelp/>}/>
                                    <Route exact path="/admin/dashboard" element={<AdminDashboard/>}/>
                                    <Route exact path="/admin/dashboard/comments" element={<AdminDashboardCommentList/>}/>
                                    <Route exact path="/root/tenant/:tid/start" element={<ToTenantRedirector/>}/>
                                    <Route exact path="/root/tenant/:tid/edit" element={<RootTenantUpdate/>}/>
                                    <Route exact path="/root/tenant/:tid" element={<RootTenantDetail/>}/>
                                    <Route exact path="/root/tenants" element={<RootTenantList/>}/>
                                    <Route exact path="/root/dashboard" element={<RootDashboard/>}/>
                                    <Route exact path="/register" element={<Register/>}/>
                                    <Route exact path="/login/2fa/step-1" element={<TwoFactorAuthenticationWizardStep1/>}/>
                                    <Route exact path="/login/2fa/step-2" element={<TwoFactorAuthenticationWizardStep2/>}/>
                                    <Route exact path="/login/2fa/step-3" element={<TwoFactorAuthenticationWizardStep3/>}/>
                                    <Route exact path="/login/2fa" element={<TwoFactorAuthenticationValidateOnLogin/>}/>
                                    <Route exact path="/login" element={<Login/>}/>
                                    <Route exact path="/logout" element={<LogoutRedirector/>}/>
                                    <Route exact path="/forgot-password" element={<ForgotPassword/>}/>
                                    <Route exact path="/password-reset" element={<PasswordReset/>}/>
                                    <Route exact path="/share" element={<AnonymousShareableLink/>}/>
                                    <Route exact path="/501" element={<NotImplementedError/>}/>
                                    <Route exact path="/" element={<Index/>}/>
                                    <Route path="*" element={<NotFoundError/>}/>
                                </Routes>
                            </section>
                            <div>
                                {/* DEVELOPERS NOTE: Mobile tab-bar menu can go here */}
                            </div>
                            <footer class="footer is-hidden">
                                <div class="container">
                                    <div class="content has-text-centered">
                                        <p>Hello</p>
                                    </div>
                                </div>
                            </footer>
                        </div>
                    </div>
                </Router>
            </RecoilRoot>
        </div>
    );
}

export default AppRoute;
