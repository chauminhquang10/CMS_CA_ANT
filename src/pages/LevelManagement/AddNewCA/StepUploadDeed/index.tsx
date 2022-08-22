import { Subtitle } from '@/components/HeadingColor';
import { useGlobalContext } from '@/context/global-context';
import { Spin } from 'antd';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import InforEntering from './Main/InfoEntering';
import SelectUpload from './Main/SelectUpload';
import ModalUPloadFile from './Modal';
import type { TypeDocumentModel } from './model';
import './style.less';

type StepUploadDeedProps = {
  onRefreshPage: () => void;
};

const Step3Upload: React.FC<StepUploadDeedProps> = (props) => {
  const { dataInQuiryCA, dataTrustDocument, isIndividual, isLoading } = useGlobalContext();
  const { onRefreshPage } = props;
  const [typeDocument, setTypeDocument] = useState<TypeDocumentModel>({
    id: 'ID_CARD',
    isIvidual: false,
    key: 0,
    title: '',
    value: '',
  });
  const [trustDocumentSelected, setTrustDocumentSelected] = useState<API.TrustDocument>();
  const [listDocument, setListDocument] = useState<API.TrustDocument[]>([]);
  const [titleStep, setTitleStep] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (dataInQuiryCA) {
      const newListDocument: API.TrustDocument[] = [];
      Object.entries(dataInQuiryCA).map((valueInquiry) => {
        switch (valueInquiry[0]) {
          case 'inquiryCAForm':
            const inquiryCAForm = valueInquiry[1] as API.TrustDocument;
            if (inquiryCAForm) {
              newListDocument.push(inquiryCAForm);
            }
            break;
          case 'individualCA':
            const idCard = valueInquiry[1] as API.IndividualCA;
            if (idCard?.idCard) {
              newListDocument.push(idCard?.idCard);
            }
            break;
          case 'enterpriseCA':
            const enterprisceCA = valueInquiry[1] as API.EnterpriseCA;
            if (enterprisceCA?.businessLicense) {
              newListDocument.push(enterprisceCA?.businessLicense);
            }
            if (enterprisceCA?.legalRepresentativeCertificate) {
              newListDocument.push(enterprisceCA?.legalRepresentativeCertificate);
            }
            if (enterprisceCA?.legalRepresentative && enterprisceCA?.legalRepresentative?.idCard) {
              newListDocument.push(enterprisceCA?.legalRepresentative?.idCard);
            }
            break;
          default:
            break;
        }
      });

      setListDocument(newListDocument);
    }
  }, [dataInQuiryCA]);

  const onCloseModal = useCallback(() => {
    setIsModalVisible(false);
    onRefreshPage();
  }, [onRefreshPage]);

  useEffect(() => {
    let title = '';
    if (dataInQuiryCA?.individualOrEnterprise || isIndividual === false) {
      title = 'Hồ sơ chứng thư Tổ chức';
    } else if (!dataInQuiryCA?.individualOrEnterprise || isIndividual === true) {
      title = 'Hồ sơ chứng thư Cá nhân';
    }
    setTitleStep(title);
  }, [dataInQuiryCA, isIndividual]);

  const uploadDocumentById = useCallback(
    (value: TypeDocumentModel) => {
      setTypeDocument(value);
      // update state with value new
      setTypeDocument((val) => {
        return val;
      });
      setIsModalVisible(true);
      if (listDocument.length > 0) {
        const lengthListDocument = listDocument.length;
        for (let index = 0; index < lengthListDocument; index++) {
          const documentTrust = listDocument[index];
          if (value.id === documentTrust.type) {
            setTrustDocumentSelected(documentTrust);
            break;
          } else {
            setTrustDocumentSelected({});
          }
        }
      }
    },
    [listDocument],
  );

  const BuildSelectUpload = useMemo(() => {
    return (
      <>
        <SelectUpload
          isIndividual={isIndividual}
          handleUploadDocument={uploadDocumentById}
          dataInquiry={dataInQuiryCA}
          listDocument={listDocument}
        />
        <InforEntering
          dataInquiry={dataInQuiryCA}
          dataDocument={dataTrustDocument}
          listDocument={listDocument}
          handleUploadDocument={uploadDocumentById}
          isIndividual={isIndividual}
        />
      </>
    );
  }, [dataInQuiryCA, dataTrustDocument, isIndividual, listDocument, uploadDocumentById]);

  const BuildModalUpload = useMemo(() => {
    return (
      <>
        <ModalUPloadFile
          isModalVisible={isModalVisible}
          onCancel={onCloseModal}
          dataForm={dataInQuiryCA}
          listDocument={listDocument}
          typeDocument={typeDocument}
          trustDocumentSelected={trustDocumentSelected}
          handleCallbackFunc={(typeDeed) => uploadDocumentById(typeDeed)}
        />
      </>
    );
  }, [
    dataInQuiryCA,
    isModalVisible,
    listDocument,
    trustDocumentSelected,
    typeDocument,
    onCloseModal,
    uploadDocumentById,
  ]);

  return (
    <Spin spinning={isLoading}>
      <div
        className="card-information"
        style={{
          maxHeight: '60vh',
          overflowY: 'auto',
        }}
        id="style-4"
      >
        <Subtitle
          style={{
            marginBottom: '28px',
            textAlign: 'center',
            position: 'sticky',
            top: '0',
            zIndex: '9',
            backgroundColor: '#fff',
            paddingBottom: '10px',
          }}
        >
          {dataInQuiryCA ? titleStep : ''}
        </Subtitle>
        {dataInQuiryCA && (
          <>
            {BuildSelectUpload}
            {BuildModalUpload}
          </>
        )}
      </div>
    </Spin>
  );
};

export default memo(Step3Upload);
