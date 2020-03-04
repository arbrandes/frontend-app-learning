import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import LearnerQuote1 from './assets/learner-quote.png';
import LearnerQuote2 from './assets/learner-quote2.png';
import VerifiedCert from './assets/verified-cert.png';

export default class CourseSock extends Component {
  constructor(props) {
    super(props);
    this.verifiedMode = props.verifiedMode;
    this.state = { showUpsell: false };
  }

  handleClick = () => {
    this.setState(state => ({
      showUpsell: !state.showUpsell,
    }));
  }

  render() {
    const buttonClass = this.state.showUpsell ? 'btn-success' : 'btn-outline-success';
    return (
      <div className="verification-sock container py-5">
        <div className="d-flex justify-content-center">
          <button type="button" aria-expanded="false" className={`btn ${buttonClass}`} onClick={this.handleClick}>
            <FormattedMessage
              id="coursesock.upsell.heading"
              defaultMessage="Learn About Verified Certificates"
              description="The heading for the upsell dialog"
            />
          </button>
        </div>
        {this.state.showUpsell && (
        <div className="d-flex justify-content-around">
          <div className="mt-3">
            <h2 className="font-weight-lighter">
              <FormattedMessage
                id="coursesock.upsell.verifiedcert"
                defaultMessage="edX Verified Certificate"
              />
            </h2>
            <h3>
              <FormattedMessage
                id="coursesock.upsell.why"
                defaultMessage="Why upgrade?"
              />
            </h3>
            <ul>
              <li><FormattedMessage
                id="coursesock.upsell.reason1"
                defaultMessage="Official proof of completion"
              />
              </li>
              <li><FormattedMessage
                id="coursesock.upsell.reason2"
                defaultMessage="Easily shareable certificate"
              />
              </li>
              <li><FormattedMessage
                id="coursesock.upsell.reason3"
                defaultMessage="Proven motivator to complete the course"
              />
              </li>
              <li><FormattedMessage
                id="coursesock.upsell.reason4"
                defaultMessage="Certificate purchases help edX continue to offer free courses"
              />
              </li>
            </ul>
            <h3><FormattedMessage
              id="coursesock.upsell.howtitle"
              defaultMessage="How it works"
            />
            </h3>
            <ul>
              <li><FormattedMessage
                id="coursesock.upsell.how1"
                defaultMessage="Pay the Verified Certificate upgrade fee"
              />
              </li>
              <li><FormattedMessage
                id="coursesock.upsell.how2"
                defaultMessage="Verify your identity with a webcam and government-issued ID"
              />
              </li>
              <li><FormattedMessage
                id="coursesock.upsell.how3"
                defaultMessage="Study hard and pass the course"
              />
              </li>
              <li><FormattedMessage
                id="coursesock.upsell.how4"
                defaultMessage="Share your certificate with friends, employers, and others"
              />
              </li>
            </ul>
            <h3><FormattedMessage
              id="coursesock.upsell.storytitle"
              defaultMessage="edX Learner Stories"
            />
            </h3>
            <div className="d-flex align-items-center my-4">
              <img style={{ maxWidth: '4rem' }} alt="Christina Fong" src={LearnerQuote1} />
              <div className="w-50 px-4">
                <FormattedMessage
                  id="coursesock.upsell.story1"
                  defaultMessage="My certificate has helped me showcase my knowledge on my
                   resume - I feel like this certificate could really help me land
                   my dream job!"
                />
                <br />
                <strong>&mdash; <FormattedMessage
                  id="coursesock.upsell.learner"
                  description="Name of learner"
                  defaultMessage="{ name }, edX Learner"
                  values={{ name: 'Christina Fong' }}
                />
                </strong>
              </div>
            </div>
            <div className="d-flex align-items-center my-2">
              <img style={{ maxWidth: '4rem' }} alt="Chery Troell" src={LearnerQuote2} />
              <div className="w-50 px-4">
                <FormattedMessage
                  id="coursesock.upsell.story2"
                  defaultMessage="I wanted to include a verified certificate on my resume and my profile to
                 illustrate that I am working towards this goal I have and that I have
                 achieved something while I was unemployed."
                />
                <br />
                <strong>&mdash; <FormattedMessage
                  id="coursesock.upsell.learner"
                  description="Name of learner"
                  defaultMessage="{ name }, edX Learner"
                  values={{ name: 'Cheryl Troell' }}
                />
                </strong>
              </div>
            </div>
          </div>
          <div className="d-flex flex-column justify-content-between">
            <img alt="Example Certificate" src={VerifiedCert} />
            <a href={this.verifiedMode.upgradeUrl} className="btn btn-success btn-lg btn-upgrade focusable" data-creative="original_sock" data-position="sock">
              <FormattedMessage
                id="coursesock.upsell.upgrade"
                defaultMessage="Upgrade ({symbol}{price} {currency})"
                values={{
                  symbol: this.verifiedMode.currencySymbol,
                  price: this.verifiedMode.price,
                  currency: this.verifiedMode.currency,
                }}
              />
            </a>
          </div>
        </div>
        )}
      </div>
    );
  }
}

CourseSock.propTypes = {
  verifiedMode: PropTypes.shape({
    price: PropTypes.number,
    currency: PropTypes.string,
    currencySymbol: PropTypes.string,
    sku: PropTypes.string,
    upgradeUrl: PropTypes.string,
  }),
};

CourseSock.defaultProps = {
  verifiedMode: null,
};
