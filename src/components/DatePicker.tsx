import { DatePicker as AntDatePicker } from 'antd';
import dateFnsGenerateConfig from '@rc-component/picker/es/generate/dateFns';

export const DatePicker = AntDatePicker.generatePicker<Date>(dateFnsGenerateConfig);
