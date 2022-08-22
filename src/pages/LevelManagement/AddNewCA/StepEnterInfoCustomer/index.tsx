import { CustomHeading5 } from '@/components/HeadingColor';
import { useGlobalContext } from '@/context/global-context';
import { Spin } from 'antd';
import { memo, useCallback } from 'react';
import FormInfor from './Main/FormInfor';
import FormInfoUnit from './Main/FormInfoUnit';
import './style.less';

interface Step2Props {
  handleCheckUser?: (phoneNumber: string) => void;
}

const Step2EnterInfoUser: React.FC<Step2Props> = (props) => {
  const { handleCheckUser } = props;
  const { isIndividual, formOwner, isCheckAccount, isLoading } = useGlobalContext();
  console.log('isIndividual', isIndividual);

  const handleCheckUserChild = useCallback(
    (phoneNumber: string) => {
      handleCheckUser?.(phoneNumber);
    },
    [handleCheckUser],
  );

  return (
    <div
      className="card-information"
      style={{ maxHeight: '60vh', overflow: 'auto', paddingRight: '20px' }}
      id="style-4"
    >
      <Spin spinning={isLoading}>
        {isCheckAccount && (
          <CustomHeading5 style={{ marginBottom: '28px', fontWeight: 'bold' }}>
            Thông tin {isIndividual ? 'Cá nhân' : 'Cá nhân thuộc tổ chức'}
          </CustomHeading5>
        )}
        {!isCheckAccount && (
          <CustomHeading5
            style={{
              marginBottom: '28px',
              fontWeight: 'bold',
              width: '40%',
              margin: 'auto',
              paddingBottom: '40px',
              whiteSpace: 'nowrap',
            }}
          >
            Khách hàng sử dụng: {isIndividual ? 'Cá nhân' : 'Cá nhân thuộc tổ chức'}
          </CustomHeading5>
        )}
        {isCheckAccount && !isIndividual && (
          <div>
            <span className="label-txt-required fw-bold">NGƯỜI SỞ HỮU CHỨNG THƯ</span>
            <span className="label-note">(Đại diện của tổ chức theo pháp luật)</span>
          </div>
        )}
        <FormInfor
          isCheck={isCheckAccount}
          typeForm="Owner"
          isIndividual={isIndividual}
          formCurrent={formOwner}
          handleCheckUser={(value) => handleCheckUserChild(value)}
        />

        {isCheckAccount && (
          <>
            {!isIndividual && (
              <div style={{ marginTop: '28px' }}>
                <span className="label-txt-required fw-bold">THÔNG TIN ĐƠN VỊ</span>
              </div>
            )}
            <FormInfoUnit form={formOwner} isIndividual={isIndividual} />
            {!isIndividual && (
              <>
                <div style={{ marginTop: '28px' }}>
                  <span className="label-txt-required fw-bold">
                    THÔNG TIN LÃNH ĐẠO DOANH NGHIỆP (Tổng giám đốc/giám đốc)
                  </span>
                </div>
                <FormInfor
                  typeForm="LeaderShip"
                  formCurrent={formOwner}
                  isIndividual={isIndividual}
                  isCheck={true}
                />
                <div style={{ marginTop: '28px' }}>
                  <span className="label-txt-required fw-bold">NGƯỜI ĐẠI DIỆN MUA HÀNG</span>
                </div>
                <FormInfor
                  typeForm="BuyerInfo"
                  isIndividual={isIndividual}
                  formCurrent={formOwner}
                  isCheck={true}
                />
              </>
            )}
          </>
        )}
      </Spin>
    </div>
  );
};

export default memo(Step2EnterInfoUser);
