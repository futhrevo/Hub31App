import ErrorBoundary from '../ErrorBoundary';
import { Row, Container } from 'react-bootstrap';
import PublicNavigation from '../../components/PublicNavigation';
import AppHelmet from '../../components/AppHelmet';

const data = [
  {
    "sno": 1,
    "Details": "Head Line ",
    "Privacy_Policy": "Hub 31 formed in 2018 with a goal to provide online education and training for student through out the world. The company based in India. The privacy Policy applied to our website www.hub31.com and Mobile apps owned and controlled by HUB 31 India. We describe your choices regarding access, edit and use your personal information. By using the Services, you agree to the terms of this Privacy Policy. You shouldn’t use the Services if you don’t agree with this Privacy Policy or any other agreement that governs your use of the Services. HUB 31 protects your personal data"
  },
  {
    "sno": 2,
    "Details": "Information we collect",
    "Privacy_Policy": "The information provided by you directly will be collected and stored once you register in HUB 31. For example, we collect personal information such as name, email address, physical address, birth date, zip code, location, and details of transactions including a Dedit or credit card number, any other mode details when provided to us through our Website or when you email our support team directly. We are allowed to use the you personal information when you linked your account to third party such as from Facebook, LinkedIn, Twitter and Google"
  },
  {
    "sno": 3,
    "Details": "Email and Other Communications",
    "Privacy_Policy": "We may contact you, by email or other means as you have indicated, to send you information about our products and services, including updates, enhancements, or other related information or to communicate with you about your use of our Website. In addition, where you have agreed, we may send you promotional offers on behalf of other businesses. If you do not want to receive email or other mail from us, please indicate your preference within the account notifications page at https://www.hub31.com To Opt Out of receiving any marketing materials you can email us at the following address: optout@hub31.com."
  },
  {
    "sno": 4,
    "Details": "What We Use Your Data For",
    "Privacy_Policy": "We Use your data to things like provide our services, Commnincate with you, Troubleshoot issues, secure against fraud and abuse, improve and update our services, analyse how people use our sevices, servepersonlized advertising , and as requires by law or necessary for safety and integrity. "
  },
  {
    "sno": 5,
    "Details": "Personal Information safety",
    "Privacy_Policy": "Your account is protected by a password for your privacy and security. You are responsible for keeping this information secure in order to prevent unauthorized access to your account and Personal Information."
  },
  {
    "sno": 6,
    "Details": "Who We Share Your Data With",
    "Privacy_Policy": "As discussed above, we may give your Personal Data to the teachers for classes (“Teachers”) that you sign up for so that they can coordinate their classes, companies performing services for us, our business partners, analytics and data enrichment providers, your social media providers, companies helping us run promotions and surveys, and advertising companies who help us promote our Services. We may also share your data as needed for security, legal compliance, or as part of a corporate restructuring."
  },
  {
    "sno": 7,
    "Details": "What Kind of security we provide ",
    "Privacy_Policy": "We use appropriate security based on the type and sensitivity of data being stored. As with any internet-enabled system, there is always a risk of unauthorized access, so it’s important to protect your password and to contact us if you suspect any unauthorized access to your account."
  },
  {
    "sno": 8,
    "Details": "What Personal Information Can i Access ?",
    "Privacy_Policy": "Through your account settings, you may access, and, in some cases, edit or delete the following information:\n- Name and password;\n- Email address;\n- Payment information;\n- Location;\nuser profile information you provide such as your facebook profile, Twitter, school, College or Company name, etc.; and\n- User preferences.\nThe information you can view, update, and delete may change as the Website changes. If you have any questions about viewing or updating your information, please contact us at admin@hub31.com. We will respond to your request to access personal information on file with us within a reasonable period of time not greater than 30 days. Please note that you will also be required to authenticate your identity in order to obtain access to any personal information."
  },
  {
    "sno": 9,
    "Details": "Children’s Privacy"
  },
  {
    "sno": 10,
    "Details": "Third Party Advertising",
    "Privacy_Policy": "A cookie is used to indicate to other websites that you visited a particular page, and allows us to tailor our marketing to better suit your needs and only display ads that are relevant to you. This cookie does not in any way give access to your computer or mobile device."
  },
  {
    "sno": 11,
    "Details": "Cookie Policy",
    "Privacy_Policy": "From time to time, we may update this Cookie Policy. If we do, we’ll notify you by posting the policy on our site with a new effective date. If we make any material changes, we’ll take reasonable steps to notify you in advance of the planned change. If you have any questions about our use of cookies, please email us at admin@hub31.com, rakesh@hub31.com"
  },
  {
    "sno": 12,
    "Details": "Changes to this Privacy Policy",
    "Privacy_Policy": "We may amend or update this Privacy Policy from time to time and any such changes or updates will be posted to this Privacy Policy, our Website or other place we deem appropriate so that you are informed as to what information we collect, how we use that information, and under what circumstances we may share that information. If we make material changes in the way we use Personal Information, we will notify you by posting an announcement on our Website or sending you an email prior to the change becoming effective."
  }
];

const privacy = () => {
  return (
    <ErrorBoundary>
      <Container className="onboard flex-fill my-5" fluid>
        <AppHelmet title="Privacy" />
        <PublicNavigation />
        <Container>
          <Row className="justify-content-center">
            <div style={{ margin: '12px' }}>
              <h4 className="centerText">Privacy Policy</h4>
              <hr className="colorgraph" />
              {data.map(el => {
                return (
                  <div key={el.sno}>
                    <h6>{`${el.sno}. ${el.Details}`}</h6>
                    <p>{el.Privacy_Policy}</p>
                  </div>
                );
              })}
            </div>
          </Row>
        </Container>
      </Container>
    </ErrorBoundary>
  );
}

export default privacy;

