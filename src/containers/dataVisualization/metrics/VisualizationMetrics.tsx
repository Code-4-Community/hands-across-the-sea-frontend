import React, { useState } from 'react';
import { Col, Row, Select } from 'antd';
import { Line, Column, Area } from '@ant-design/plots';
import { useQuery } from 'react-query';
import protectedApiClient from '../../../api/protectedApiClient';
import { StyledRow } from '../../../components/dataVisualization';
import FormItemDropdown from '../../../components/form-style/FormItemDropdown';
import SelectDropDown from '../../../components/dataVisualization/SelectDropDown';
import { xAxis } from '../../../utils/xaxis';
import { yAxis } from '../../../utils/yaxis';
import { convertEnumToRegularText } from '../../../utils/helpers';
import { Countries } from '../../../utils/countries';
import { LibraryReportResponse } from '../../library-report/ducks/types';
import moment from 'moment';

enum CHART_TYPES {
  LINE = 'Line',
  COLUMN = 'Column',
  AREA = 'Area',
}

interface DisplayDict {
  [index: string]: string;
}

const DISPLAY_TO_PARAM: DisplayDict = {
  'Number of Books': 'countBooks',
  'Number of Children': 'countStudents',
  'Number of Schools with Libraries': 'countSchools',
  'Number of Schools Without Libraries': 'countSchools',
};

const VisualizationMetrics: React.FC = () => {
  const [selectedxAxis, setSelectedxAxis] = useState<string>(xAxis.COUNTRY);
  const [selectedyAxis, setSelectedyAxis] = useState<string>(
    yAxis.NUMBER_OF_BOOKS,
  );
  const handlexAxisSelect = async (selectedValue: string) => {
    setSelectedxAxis(selectedValue);
    await refetch();
  };
  const handleyAxisSelect = async (selectedValue: string) => {
    setSelectedyAxis(selectedValue);
    await refetch();
  };

  function formatDate(date: string) {
    return moment(date).format('MM/DD/YYYY');
  }

  const [selectedChartType, setSelectedChartType] = useState<string>('LINE');

  async function aggregatePaginatedReports(schoolId: number) {
    let aggregatedData: LibraryReportResponse[] = [];
    let currentPageData;
    let currentPageNum = 1;
    do {
      currentPageData = (
        await protectedApiClient.getPastSubmissionReports(
          schoolId,
          currentPageNum,
        )
      ).reports;
      aggregatedData = [...aggregatedData, ...currentPageData];
      currentPageNum++;
    } while (currentPageData.length > 0);
    return aggregatedData;
  }

  function getLibraryAcquisitionDate(aggregatedData: LibraryReportResponse[]) {
    const sortedData = aggregatedData
      .map((report) => {
        return {
          time: formatDate(report.createdAt),
          libraryExists: report.libraryStatus === 'EXISTS',
          countSchools: 0,
        };
      })
      .sort((a, b) => Date.parse(a?.time ?? '') - Date.parse(b?.time ?? ''));
    return sortedData.find((report) => report.libraryExists);
  }

  async function getDataOverTime() {
    const allSchools = (await protectedApiClient.getAllSchools()).map(
      (school) => school.id,
    );
    let aggregatedData = [];
    if (selectedyAxis === yAxis.NUMBER_OF_SCHOOLS_WITH_LIBRARIES) {
      for (const schoolId of allSchools) {
        aggregatedData.push(
          getLibraryAcquisitionDate(await aggregatePaginatedReports(schoolId)),
        );
      }
      let index = 0;
      aggregatedData
        .sort((a, b) => Date.parse(a?.time ?? '') - Date.parse(b?.time ?? ''))
        .map((report) => {
          if (report) {
            index++;
            report.countSchools = index;
          }
          return report;
        });
    } else if (selectedyAxis === yAxis.NUMBER_OF_SCHOOLS_WITHOUT_LIBRARIES) {
      for (const schoolId of allSchools) {
        aggregatedData.push(
          getLibraryAcquisitionDate(await aggregatePaginatedReports(schoolId)),
        );
      }
      let index = allSchools.length;
      aggregatedData
        .sort((a, b) => Date.parse(a?.time ?? '') - Date.parse(b?.time ?? ''))
        .map((report) => {
          if (report) {
            index--;
            report.countSchools = index;
          }
          return report;
        });
    } else if (selectedyAxis === yAxis.NUMBER_OF_CHILDREN) {
      for (const schoolId of allSchools) {
        const paginatedReports = await aggregatePaginatedReports(schoolId);
        for (const report of paginatedReports) {
          aggregatedData.push({
            time: formatDate(report.createdAt),
            countStudents: report.numberOfChildren,
          });
        }
      }
    }
    aggregatedData = aggregatedData
      .filter((report) => report)
      .sort((a, b) => Date.parse(a.time) - Date.parse(b.time));
    return aggregatedData;
  }

  async function getDataPerCountry() {
    const aggregatedData = [];

    for (const country of Object.keys(Countries)) {
      const metric = await protectedApiClient.getCountryMetrics(country);

      if (selectedyAxis === yAxis.NUMBER_OF_BOOKS) {
        aggregatedData.push({ country, countBooks: metric.countBooks ?? 0 });
      } else if (selectedyAxis === yAxis.NUMBER_OF_CHILDREN) {
        aggregatedData.push({
          country,
          countStudents: metric.countStudents ?? 0,
        });
      }
    }

    return aggregatedData;
  }

  async function getData() {
    let aggregatedData;
    if (selectedxAxis === xAxis.COUNTRY) {
      aggregatedData = await getDataPerCountry();
    } else if (selectedxAxis === xAxis.TIME) {
      aggregatedData = await getDataOverTime();
    }
    return aggregatedData;
  }

  const { isLoading, error, data, refetch } = useQuery(
    'aggregatedData',
    getData,
  );

  const displayChart = () => {
    const config = {
      width: 750,
      data: data || [],
      xAxis: {
        title: { text: selectedxAxis },
      },
      yAxis: {
        title: { text: selectedyAxis },
      },
      xField: selectedxAxis === xAxis.COUNTRY ? 'country' : 'time',
      yField: DISPLAY_TO_PARAM[selectedyAxis],
    };

    if (selectedChartType === 'LINE') {
      return <Line {...config} />;
    } else if (selectedChartType === 'COLUMN') {
      return <Column {...config} />;
    } else if (selectedChartType === 'AREA') {
      return <Area {...config} />;
    }
  };

  return (
    <>
      <StyledRow justify="center">
        <Col span={16}>
          <FormItemDropdown
            clarifyText={'Select Graph Type'}
            optionsEnum={CHART_TYPES}
            name={'chartType'}
            text={'Line'}
            disabled={false}
            required={true}
            onChange={(value) => setSelectedChartType(value)}
          />
          <StyledRow justify="start">
            <Col span={16}>Select Data to Display on X-Axis</Col>
          </StyledRow>
          <SelectDropDown
            value={selectedxAxis}
            selectedButton={'x-axis'}
            onChange={async (selectedValue) =>
              await handlexAxisSelect(selectedValue)
            }
            placeholder={'Select the x-axis'}
          >
            {Object.values(xAxis).map((key: string) => (
              <Select.Option key={key} value={key}>
                {convertEnumToRegularText(key)}
              </Select.Option>
            ))}
          </SelectDropDown>
        </Col>
      </StyledRow>

      <StyledRow justify="center">
        <Col span={16}>Select Data to Display on Y-Axis</Col>
      </StyledRow>
      <StyledRow justify="center">
        <Col span={16}>
          <SelectDropDown
            value={selectedyAxis}
            selectedButton={'y-axis'}
            onChange={async (selectedValue) =>
              await handleyAxisSelect(selectedValue)
            }
            placeholder={'Select the y-axis'}
          >
            {Object.values(yAxis).map((key: string) => (
              <Select.Option key={key} value={key}>
                {convertEnumToRegularText(key)}
              </Select.Option>
            ))}
          </SelectDropDown>
        </Col>
      </StyledRow>

      <Row justify="center">
        {isLoading && <p>Loading visualization...</p>}
        {error && <p>An error occurred loading visualization</p>}
        {data && displayChart()}
      </Row>
    </>
  );
};

export default VisualizationMetrics;
