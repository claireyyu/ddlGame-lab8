import styles from './ResultPaipan.module.css'; 
import { type BaziPaipanProps } from '../../types/paipan';
import { useTranslations, useLocale } from 'next-intl';

export function BaziPaipan({ yearStem, yearBranch, monthStem, monthBranch, dayStem, dayBranch, hourStem, hourBranch }: BaziPaipanProps) {
  const t = useTranslations('ResultPaipan');
  const locale = useLocale();

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
  
  
  return (
    <div className="flex flex-col mx-4 lg:mx-12 xl:mx-16">
        {/* Bazi Content */}
      <div className={"grid grid-cols-5 gap-4 p-2 bg-foreground rounded-custom-lg shadow-card"}>
        <div className={styles.pillarText}></div>
        <div className={styles.pillarText}>{t('yearPillar')}</div>
        <div className={styles.pillarText}>{t('monthPillar')}</div>
        <div className={styles.pillarText}>{t('dayPillar')}</div>
        <div className={styles.pillarText}>{t('hourPillar')}</div>

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
      </div>
    </div>
  );
}

export function BaziDetail({ rizhu_detail, personality_detail }) {
  const t = useTranslations('ResultDetail');

  return (
    <div>
      <p className="text-justify">{t('birthDateInterpretation')} <br/><br/>{rizhu_detail}</p>
      <br/>
      <p className="text-justify">{t('baziInterpretation')} <br /><br />{personality_detail}</p>
      
    </div>
  )
}