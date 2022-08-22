import { ActivityIcon } from '@/themes/icons';
import { Avatar, Badge, Card } from 'antd';
import moment from 'moment';
import avatarImg from '@/assets/images/png/avatar/user-male.png';
import './index.less';

export type CardUserProps = {
  avatar?: string;
  activityTime?: string | Date;
  dataUser?: API.User;
};

const CardUser: React.FC<CardUserProps> = (props) => {
  const { activityTime, dataUser } = props;
  console.log('dataUser', dataUser?.avatar);

  const timeActive = moment(activityTime, 'YYYYMMDD').locale('en').fromNow();

  return (
    <div className="site-card-border-less-wrapper">
      <Card
        bordered={false}
        style={{
          //   width: 300,
          backgroundColor: 'inherit',
        }}
      >
        <div className="group-avatar">
          <div className="avatar-item">
            <Badge
              status="success"
              style={{ bottom: '-8px', top: 'unset', left: '-8px' }}
              count={activityTime && <ActivityIcon />}
              offset={[0, 0]}
            >
              <Avatar
                size={'large'}
                style={{ width: '44px', height: '44px' }}
                shape="circle"
                icon={
                  <img
                    src={dataUser?.avatar ? `data:image/png;base64,${dataUser?.avatar}` : avatarImg}
                  />
                }
              />
            </Badge>
          </div>
          <div className="avatar-info">
            <div className="avatar-info-name">
              <span className="txt-name">{dataUser?.fullName}</span>

              {activityTime && (
                <>
                  <span className="dot-custom" /> <span className="txt-hours">{timeActive}</span>
                </>
              )}
            </div>
            <div className="avatar-info-phone">{dataUser?.phone}</div>
            <div className="avatar-info-email">{dataUser?.email}</div>
            <div className="avatar-info-id">{dataUser?.id || 'unicloudID'}</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CardUser;
