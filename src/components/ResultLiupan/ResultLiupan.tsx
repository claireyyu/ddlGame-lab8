import styles from './ResultLiupan.module.css';
import { useState, useContext, useEffect } from 'react';
import DayunNianzhuHelper from '../../utils/DayunNianzhuHelper';
import { type BaziPaipanProps } from '../../types/paipan';
import { BaziContext } from '../../contexts/BaziContext';
import {useTranslations, useLocale} from 'next-intl';

const colorMap = {
  // 10 Heavenly Stems
  甲: '#0FA958',
  乙: '#0FA958',
  丙: '#E73434',
  丁: '#E73434',
  戊: '#AD6420',
  己: '#AD6420',
  庚: '#E8A908',
  辛: '#E8A908',
  壬: '#49C2F6',
  癸: '#49C2F6',

  // 12 Earthly Branches
  子: '#49C2F6',
  丑: '#AD6420',
  寅: '#0FA958',
  卯: '#0FA958',
  辰: '#AD6420',
  巳: '#E73434',
  午: '#E73434',
  未: '#AD6420',
  申: '#E8A908',
  酉: '#E8A908',
  戌: '#AD6420',
  亥: '#49C2F6',
};

const getColor = (char) => colorMap[char] || '#000';

export function BaziLiupan({ yearStem, yearBranch, monthStem, monthBranch, dayStem, dayBranch, hourStem, hourBranch }: { yearStem: string, yearBranch: string, monthStem: string, monthBranch: string, dayStem: string, dayBranch: string, hourStem: string, hourBranch: string }) {
  const { selectedDayunGanzhi, selectedLiunianGanzhi, selectedLiuyueGanzhi, dayunNianzhuArray } = useContext(BaziContext);
  const t = useTranslations('ResultLiupan');
  const locale = useLocale();

  return (
    <div className={`flex flex-col ${locale !== 'zh' ? 'mx-2 text-xs lg:text-base' : 'items-center'}`}>
      {/* Bazi Content */}
      <div className="grid grid-cols-8 p-2 mx-4 bg-foreground">
        <div className={styles.pillarHeaderText}></div>
        <div className={styles.pillarHeaderText}>{t('yearPillar')}</div>
        <div className={styles.pillarHeaderText}>{t('monthPillar')}</div>
        <div className={styles.pillarHeaderText}>{t('dayPillar')}</div>
        <div className={styles.pillarHeaderText}>{t('hourPillar')}</div>
        <div className={styles.pillarHeaderText}>{t('decadeCycle')}</div>
        <div className={styles.pillarHeaderText}>{t('yearlyCycle')}</div>
        <div className={styles.pillarHeaderText}>{t('monthlyCycle')}</div>

        <div className={styles.pillarText}>{t('topStem')}</div>
        <div className={styles.pillarText}
            style={{ color: getColor(yearStem) }}
        >{yearStem}</div>
        <div className={styles.pillarText}
            style={{ color: getColor(monthStem) }}
        >{monthStem}</div>
        <div className={styles.pillarText}
            style={{ color: getColor(dayStem) }}
        >{dayStem}</div>
        <div className={styles.pillarText}
            style={{ color: getColor(hourStem) }}
        >{hourStem}</div>
        <div className={styles.pillarTextLBorder}
            style={{ color: getColor(selectedDayunGanzhi[0]) }}
        >{selectedDayunGanzhi[0]}</div>
        <div className={styles.pillarText}
            style={{ color: getColor(selectedLiunianGanzhi[0]) }}
        >{selectedLiunianGanzhi[0]}</div>
        <div className={styles.pillarText}
            style={{ color: getColor(selectedLiuyueGanzhi[0]) }}
        >{selectedLiuyueGanzhi[0]}</div>

        <div className={styles.pillarText}>{t('bottomBranch')}</div>
        <div className={styles.pillarText}
            style={{ color: getColor(yearBranch) }}
        >{yearBranch}</div>
        <div className={styles.pillarText}
            style={{ color: getColor(monthBranch) }}
        >{monthBranch}</div>
        <div className={styles.pillarText}
            style={{ color: getColor(dayBranch) }}
        >{dayBranch}</div>
        <div className={styles.pillarText}
            style={{ color: getColor(hourBranch) }}
        >{hourBranch}</div>
        <div className={styles.pillarTextLBorder}
            style={{ color: getColor(selectedDayunGanzhi[1]) }}
        >{selectedDayunGanzhi[1]}</div>
        <div className={styles.pillarText}
            style={{ color: getColor(selectedLiunianGanzhi[1]) }}
        >{selectedLiunianGanzhi[1]}</div>
        <div className={styles.pillarText}
            style={{ color: getColor(selectedLiuyueGanzhi[1]) }}
        >{selectedLiuyueGanzhi[1]}</div>
      </div>

    </div>
  );
}

export function BaziDayun({ jiaoyun, dayunGanZhi, dayunAge, dayunStart, dayunNianzhu, baziLiuyue }) {

  const t = useTranslations('ResultLiupan');
  const locale = useLocale();

  const [selectedDayun, setSelectedDayun] = useState(0);
  const [selectedLiunian, setSelectedLiunian] = useState(0);
  const [selectedLiuyue, setSelectedLiuyue] = useState(0);

  const { selectedDayunGanzhi, setSelectedDayunGanzhi, selectedLiunianGanzhi, setSelectedLiunianGanzhi, selectedLiuyueGanzhi, setSelectedLiuyueGanzhi, dayunNianzhuArray, setDayunNianzhuArray} = useContext(BaziContext);

  const jiaoyunYear = jiaoyun.split('年')[0];
  const jiaoyunMonth = jiaoyun.split('年')[1].split('月')[0];
  const jiaoyunDay = jiaoyun.split('年')[1].split('月')[1].split('日')[0];

  const dayunNianzhuObj = JSON.parse(dayunNianzhu);
  const dayunNianzhuArr = DayunNianzhuHelper(dayunNianzhuObj);

  useEffect(() => {
    setSelectedDayunGanzhi(dayunGanZhi[selectedDayun]);
    setSelectedLiunianGanzhi(dayunNianzhuArr[selectedDayun][selectedLiunian]);
    setSelectedLiuyueGanzhi(baziLiuyue[selectedDayun][selectedLiunian][selectedLiuyue]);
  }, [selectedDayun, selectedLiunian, selectedLiuyue]);

  const liunianDates = [
    'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.', 'Jan.'
  ];

  const zhLiunianDates = [  
    '立春', '惊蛰', '清明', '立夏', '芒种', '小暑', '立秋', '白露', '寒露', '立冬', '大雪', '小寒'
  ];

  const handleClickDayun = (index: number) => {
    console.log('clicked dayun', index);
    setSelectedDayun(index);
  };

  const handleClickLiunian = (index: number) => {
    console.log('clicked liunian', index);
    setSelectedLiunian(index);
  }

  const handleClickLiuyue = (index: number) => {
    console.log('clicked liuyue', index);
    setSelectedLiuyue(index);
  }

  return (
    <div className="grid grid-cols-6 gap-4">

        <div className="col-span-1 text-sm lg:text-base flex items-center justify-center">
          {locale === 'en' ? <p>{t('startsOn')} {jiaoyunYear}-{jiaoyunMonth}-{jiaoyunDay}</p> : <p>大运</p>}
        </div>
        <div className="col-span-5 flex items-center justify-start">
          <div className="grid grid-cols-8 p-2 bg-foreground rounded-custom-lg">
          {dayunAge.map((age: number, index: number) => (
            <button
              key={index}
              className={`flex flex-col items-center hover:bg-tbSelected ${selectedDayun === index ? 'bg-tbSelected' : ''}`}
              onClick={() => handleClickDayun(index)}
            >
              {/* Header Section */}
              <div className="w-full bg-tbHeader text-center mx-4 py-2">
                { locale == 'en' ? <p className="hidden xl:block">{t('age')} {age}</p> : <p className="hidden xl:block">{age}岁</p> }
                <p className="hidden xl:block">{dayunStart[index]}</p>
                <p className="xl:hidden">{dayunStart[index].toString().slice(0, 2)}</p>
                <p className="xl:hidden">{dayunStart[index].toString().slice(2, 4)}</p>
              </div>
            
              {/* Data Section */}
              <div className="w-full p-2 text-center space-y-2">
                <p
                  style={{ color: getColor(dayunGanZhi[index][0]) }}
                >
                  {dayunGanZhi[index][0]}</p>
                <p
                  style={{ color: getColor(dayunGanZhi[index][1]) }}
                >{dayunGanZhi[index][1]}</p>
              </div>
            </button>
              ))}
          </div>
      </div>
      
      <div className="col-span-1 flex items-center justify-center">
        <p>{t('yearly')}</p>
      </div>
      <div className="col-span-5 flex items-center justify-start">
        <div className="grid grid-cols-10 p-2 bg-foreground rounded-custom-lg">
          {dayunNianzhuArr[selectedDayun].map((group: string[], index: number) => (
            <button
            key={index}
            className={`flex flex-col items-center hover:bg-tbSelected ${selectedLiunian === index ? 'bg-tbSelected' : ''}`}
            onClick={() => handleClickLiunian(index)}
            >
              {/* Header Section */}
              <div className="w-full bg-tbHeader text-center mx-6 py-2">
                {locale == 'en' ? <div><p className="hidden xl:block">{t('age')}</p>
                <p>{dayunAge[selectedDayun] + index}</p></div> : <><p>{dayunAge[selectedDayun] + index}</p><p className="hidden xl:block">岁</p></>}
              </div>

              {/* Data Section */}
              <div className="w-full p-2 text-center space-y-2">
                <p
                  style={{ color: getColor(group[0]) }}
                >{group[0]}</p>
                <p
                  style={{ color: getColor(group[1]) }}
                >{group[1]}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
      
      <div className="col-span-1 flex items-center justify-center">
          <p>{t('monthly')}</p>
        </div>
        <div className="col-span-5 flex items-center justify-start">
          <div className="grid grid-cols-12 p-2 bg-foreground rounded-custom-lg">
            {baziLiuyue[selectedDayun][selectedLiunian].map((group: string[], index: number) => (
              <button
              key={index}
              className={`flex flex-col items-center hover:bg-tbSelected ${selectedLiuyue === index ? 'bg-tbSelected' : ''}`}
              onClick={() => handleClickLiuyue(index)}
              >
                {/* Header Section */}
                <div className="w-full bg-tbHeader text-center mx-6 py-2">
                  <p className="text-xs lg:text-base">{locale === 'en' ? liunianDates[index] : zhLiunianDates[index]}</p>
                </div>

                {/* Data Section */}
                <div className="w-full p-2 text-center space-y-2">
                  <p
                    style={{ color: getColor(group[0]) }}
                  >{group[0]}</p>
                  <p
                    style={{ color: getColor(group[1]) }}
                  >{group[1]}</p>
                </div>
              </button>
            ))}
          </div>
      </div>
    </div>
  );
}
