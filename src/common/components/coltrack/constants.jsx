import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import DescriptionIcon from '@mui/icons-material/Description';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import StarIcon from '@mui/icons-material/Star';
import TimelineIcon from '@mui/icons-material/Timeline';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BarChartIcon from '@mui/icons-material/BarChart';
import RouteIcon from '@mui/icons-material/Route';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import NotesIcon from '@mui/icons-material/Notes';
import CreateIcon from '@mui/icons-material/Create';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FolderIcon from '@mui/icons-material/Folder';
import StorageIcon from '@mui/icons-material/Storage';
import BuildIcon from '@mui/icons-material/Build';
import PeopleIcon from '@mui/icons-material/People';
import TodayIcon from '@mui/icons-material/Today';
import PublishIcon from '@mui/icons-material/Publish';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import HelpIcon from '@mui/icons-material/Help';
import CampaignIcon from '@mui/icons-material/Campaign';
import { useAdministrator, useManager, useRestriction } from '../../../common/util/permissions';
import { useTranslation } from '../../../common/components/LocalizationProvider';
import useFeatures from '../../../common/util/useFeatures';

const NavRoutes = () => {
  const t = useTranslation();
  const admin = useAdministrator();
  const disableReports = useRestriction('disableReports');
  const features = useFeatures();
  const manager = useManager();
  const readonly = useRestriction('readonly');
  const supportLink = useSelector((state) => state.session.server.attributes.support);
  const user = useSelector((state) => state.session.user);

  return useMemo(() => ({
    account: {
      title: t('settingsUser'),
      route: `/settings/user/${user.id}`,
      icon: <PersonIcon />,
      dropdown: [],
      active: !readonly,
    },
    reports: {
      title: t('reportTitle'),
      route: '/reports/combined',
      icon: <DescriptionIcon />,
      active: !disableReports,
      dropdown: [
        {
          title: t('reportCombined'),
          route: '/reports/combined',
          icon: <StarIcon />,
        },
        {
          title: t('reportRoute'),
          route: '/reports/route',
          icon: <TimelineIcon />,
        },
        {
          title: t('reportEvents'),
          route: '/reports/event',
          icon: <NotificationsActiveIcon />,
        },
        {
          title: t('reportTrips'),
          route: '/reports/trip',
          icon: <PlayCircleFilledIcon />,
        },
        {
          title: t('reportStops'),
          route: '/reports/stop',
          icon: <PauseCircleFilledIcon />,
        },
        {
          title: t('reportSummary'),
          route: '/reports/summary',
          icon: <FormatListBulletedIcon />,
        },
        {
          title: t('reportChart'),
          route: '/reports/chart',
          icon: <TrendingUpIcon />,
        },
        {
          title: t('reportReplay'),
          route: '/replay',
          icon: <RouteIcon />,
        },
        {
          title: t('sharedLogs'),
          route: '/reports/logs',
          icon: <NotesIcon />,
        },
        {
          title: t('reportScheduled'),
          route: '/reports/scheduled',
          icon: <EventRepeatIcon />,
          active: !readonly,
        },
        {
          title: t('statisticsTitle'),
          route: '/reports/statistics',
          icon: <BarChartIcon />,
          active: admin,
        },
      ],
    },
    settings: {
      title: t('settingsTitle'),
      route: '/settings/preferences',
      icon: <SettingsIcon />,
      dropdown: [
        {
          title: t('sharedPreferences'),
          route: '/settings/preferences',
          icon: <SettingsIcon />,
        },
        {
          title: t('sharedNotifications'),
          route: '/settings/notifications',
          icon: <NotificationsIcon />,
          active: !readonly,
        },
        {
          title: t('deviceTitle'),
          route: '/settings/devices',
          icon: <SmartphoneIcon />,
          active: !readonly,
        },
        {
          title: t('sharedGeofences'),
          route: '/geofences',
          icon: <CreateIcon />,
          active: !readonly,
        },
        {
          title: t('settingsGroups'),
          route: '/settings/groups',
          icon: <FolderIcon />,
          active: !readonly && !features.disableGroups,
        },
        {
          title: t('sharedDrivers'),
          route: '/settings/drivers',
          icon: <PersonIcon />,
          active: !readonly && !features.disableDrivers,
        },
        {
          title: t('sharedCalendars'),
          route: '/settings/calendars',
          icon: <TodayIcon />,
          active: !readonly && !features.disableCalendars,
        },
        {
          title: t('sharedComputedAttributes'),
          route: '/settings/attributes',
          icon: <StorageIcon />,
          active: !readonly && !features.disableComputedAttributes,
        },
        {
          title: t('sharedMaintenance'),
          route: '/settings/maintenances',
          icon: <BuildIcon />,
          active: !readonly && !features.disableMaintenance,
        },
        {
          title: t('sharedSavedCommands'),
          route: '/settings/commands',
          icon: <PublishIcon />,
          active: !readonly && !features.disableSavedCommands,
        },
        {
          title: t('settingsSupport'),
          route: supportLink,
          icon: <HelpIcon />,
          active: supportLink,
        },
        {
          title: t('serverAnnouncement'),
          route: '/settings/announcement',
          icon: <CampaignIcon />,
          active: manager && admin,
        },
        {
          title: t('settingsServer'),
          route: '/settings/server',
          icon: <StorageIcon />,
          active: manager && admin,
        },
        {
          title: t('settingsUsers'),
          route: '/settings/users',
          icon: <PeopleIcon />,
          active: manager && admin,
        },
      ],
    },
  }), [t, user, disableReports, readonly, admin, features, supportLink, manager]);
};

export default NavRoutes;
