import PropTypes from 'prop-types';

import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import { getAuthenticatedUser } from '@edx/frontend-platform/auth';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Collapsible, Icon, Row } from '@openedx/paragon';
import {
  ArrowDropDown,
  ArrowDropUp,
  Info,
  Locked,
} from '@openedx/paragon/icons';
import { useContextId } from '../../../../data/hooks';

import messages from '../messages';
import { useModel } from '../../../../generic/model-store';
import ProblemScoreDrawer from './ProblemScoreDrawer';

const SubsectionTitleCell = ({ subsection }) => {
  const intl = useIntl();
  const courseId = useContextId();
  const {
    org,
  } = useModel('courseHomeMeta', courseId);
  const {
    gradesFeatureIsFullyLocked,
  } = useModel('progress', courseId);

  const {
    blockKey,
    displayName,
    problemScores,
    url,
  } = subsection;

  const { administrator } = getAuthenticatedUser();
  const logSubsectionClicked = () => {
    sendTrackEvent('edx.ui.lms.course_progress.detailed_grades_assignment.clicked', {
      org_key: org,
      courserun_key: courseId,
      is_staff: administrator,
      assignment_block_key: blockKey,
    });
  };

  return (
    <Collapsible.Advanced>
      <Row className="w-100 m-0">
        <Collapsible.Trigger
          className="mr-1 position-absolute"
          aria-label={intl.formatMessage(messages.problemScoreToggleAltText, { subsectionTitle: displayName })}
          tabIndex={gradesFeatureIsFullyLocked ? '-1' : '0'}
        >
          <Collapsible.Visible whenClosed><Icon src={ArrowDropDown} /></Collapsible.Visible>
          <Collapsible.Visible whenOpen><Icon src={ArrowDropUp} /></Collapsible.Visible>
        </Collapsible.Trigger>
        <span className="small d-inline ml-4 pl-1">
          {gradesFeatureIsFullyLocked || subsection.learnerHasAccess ? ''
            : (
              <Icon
                id={`detailedGradesBlockedIcon${subsection.blockKey}`}
                aria-label={intl.formatMessage(messages.noAccessToSubsection, { displayName })}
                className="mr-1 mt-1 d-inline-flex"
                style={{ height: '1rem', width: '1rem' }}
                src={Locked}
                data-testid="locked-icon"
              />
            )}
          {url ? (
            <a
              href={url}
              className="muted-link small"
              onClick={logSubsectionClicked}
              tabIndex={gradesFeatureIsFullyLocked ? '-1' : '0'}
              aria-labelledby={`detailedGradesBlockedIcon${subsection.blockKey}`}
            >
              {displayName}
            </a>
          ) : (
            <span className="greyed-out small">{displayName}</span>
          )}
        </span>
      </Row>
      <Collapsible.Body className="d-flex w-100">
        <div className="col">
          { subsection.override && (
            <div className="row w-100 m-0 x-small ml-4 pt-2 pl-1 text-gray-700 flex-nowrap">
              <div>
                <Icon
                  src={Info}
                  className="x-small mr-1 text-primary-500"
                  style={{ height: '1.3em', width: '1.3em' }}
                />
              </div>
              <div>{intl.formatMessage(messages.sectionGradeOverridden)}</div>
            </div>
          )}
          <ProblemScoreDrawer problemScores={problemScores} subsection={subsection} />
        </div>
      </Collapsible.Body>
    </Collapsible.Advanced>
  );
};

SubsectionTitleCell.propTypes = {
  subsection: PropTypes.shape({
    blockKey: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    learnerHasAccess: PropTypes.bool.isRequired,
    override: PropTypes.shape({
      system: PropTypes.string,
      reason: PropTypes.string,
    }),
    problemScores: PropTypes.arrayOf(PropTypes.shape({
      earned: PropTypes.number.isRequired,
      possible: PropTypes.number.isRequired,
    })).isRequired,
    url: PropTypes.string,
  }).isRequired,
};

export default SubsectionTitleCell;
