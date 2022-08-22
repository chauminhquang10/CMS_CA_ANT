import CollapseCustom from '@/components/CollapseFAQs';
import { PageContainer } from '@ant-design/pro-components';
import { Card } from 'antd';

const CollapsePage: React.FC = () => {
  return (
    <PageContainer>
      <Card>
        <CollapseCustom keyPanel={1} />
      </Card>
    </PageContainer>
  );
};

export default CollapsePage;
