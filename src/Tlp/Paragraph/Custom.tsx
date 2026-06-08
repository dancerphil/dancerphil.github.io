import { ReactNode } from 'react';
import { codeFamily } from '@/Tlp/styles';
import { FlexContainer, CustomTruthTable } from '@/Tlp/Paragraph/CustomTruthTable';
import { CustomCube, CustomSight } from './CustomSvg';
import { CustomDiagram1, CustomDiagram2, CustomDiagram3, CustomDiagram4, CustomDiagram5 } from './CustomDiagram';
import { Centered } from './Components';
import { TruthTable } from './TruthTable';

const ListContainer = ({ children }: { children: ReactNode }) => (
    <div style={{ fontSize: '13px', fontFamily: codeFamily, marginLeft: '4em' }}>{children}</div>
);

const FlexCentered = ({ children }: { children: ReactNode }) => (
    <div style={{ display: 'flex', justifyContent: 'center' }}>{children}</div>
);

const AlignRight = ({ children }: { children: ReactNode }) => (
    <div style={{ textAlign: 'right' }}>{children}</div>
);

const values4442 = [
    'p', 'q', '',
    'W', 'W', 'W',
    'F', 'W', 'W',
    'W', 'F', '',
    'F', 'F', 'W',
];

const values4442_en = [
    'p', 'q', '',
    'T', 'T', 'T',
    'F', 'T', 'T',
    'T', 'F', '',
    'F', 'F', 'T',
];

const values5101 = [
    '(WWWW)(p, q) 重言式（如果 p 则 p，且如果 q 则 q）[p ⊃ p · q ⊃ q]',
    '(FWWW)(p, q) 用话来说：非 p 且 q 两者· [~(p · q)]',
    '(WFWW)(p, q) 用话来说：如果 q 则 p· [q ⊃ p]',
    '(WWFW)(p, q) 用话来说：如果 p 则 q· [p ⊃ q]',
    '(WWWF)(p, q) 用话来说：p 或 q· [p v q]',
    '(FFWW)(p, q) 用话来说：非 q· [~q]',
    '(FWFW)(p, q) 用话来说：非 p· [~p]',
    '(FWWF)(p, q) 用话来说：p 或 q，但非两者· [p · ~q :v: q · ~p]',
    '(WFFW)(p, q) 用话来说：如果 p 则 q，且如果 q 则 p· [p ≡ q]',
    '(WFWF)(p, q) 用话来说：p',
    '(WWFF)(p, q) 用话来说：q',
    '(FFFW)(p, q) 用话来说：既非 p 亦非 q· [p · ~q 或 p | q]',
    '(FFWF)(p, q) 用话来说：p 且非 q· [p · ~q]',
    '(FWFF)(p, q) 用话来说：q 且非 p· [q · ~p]',
    '(WFFF)(p, q) 用话来说：p 且 q· [p · q]',
    '(FFFF)(p, q) 矛盾式（p 且非 p；且 q 且非 q）[p · ~p · q · ~q]',
];

const values5101_de = [
    '(W W W W)(p, q) Tautologie      (Wenn p, so p; und wenn q, so q.) (p \u2283 p \u00b7 q \u2283 q)',
    '(F W W W)(p, q) in Worten:      Nicht beides p und q. (\u223c(p \u00b7 q))',
    '(W F W W)(p, q) \u00bb           Wenn q, so p. (q \u2283 p)',
    '(W W F W)(p, q) \u00bb           Wenn p, so q. (p \u2283 q)',
    '(W W W F)(p, q) \u00bb           p oder q. (p \u2228 q)',
    '(F F W W)(p, q) \u00bb           Nicht q. (\u223cq)',
    '(F W F W)(p, q) \u00bb           Nicht p. (\u223cp)',
    '(F W W F)(p, q) \u00bb           p, oder q, aber nicht beide. (p \u00b7 \u223cq :\u2228: q \u00b7 \u223cp)',
    '(W F F W)(p, q) \u00bb           Wenn p, so q; und wenn q, so p. (p \u2261 q)',
    '(W F W F)(p, q) \u00bb           p',
    '(W W F F)(p, q) \u00bb           q',
    '(F F F W)(p, q) \u00bb           Weder p noch q. (\u223cp \u00b7 \u223cq) oder (p | q)',
    '(F F W F)(p, q) \u00bb           p und nicht q. (p \u00b7 \u223cq)',
    '(F W F F)(p, q) \u00bb           q und nicht p. (q \u00b7 \u223cp)',
    '(W F F F)(p, q) \u00bb           q und p. (q \u00b7 p)',
    '(F F F F)(p, q) Kontradiktion   (p und nicht p; und q und nicht q.) (p \u00b7 \u223cp \u00b7 q \u00b7 \u223cq)',
];

const values5101_en = [
    '(TTTT)(p, q) Tautology (if p then p, and if q then q) [p ⊃ p · q ⊃ q]',
    '(FTTT)(p, q) in words: Not both p and q· [~(p · q)]',
    '(TFTT)(p, q) in words: If q then p· [q ⊃ p]',
    '(TTFT)(p, q) in words: If p then q· [p ⊃ q]',
    '(TTTF)(p, q) in words: p or q· [p v q]',
    '(FFTT)(p, q) in words: Not q· [~q]',
    '(FTFT)(p, q) in words: Not p· [~p]',
    '(FTTF)(p, q) in words: p or q, but not both· [p · ~q :v: q · ~p]',
    '(TFFT)(p, q) in words: If p then q, and if q then p· [p ≡ q]',
    '(TFTF)(p, q) in words: p',
    '(TTFF)(p, q) in words: q',
    '(FFFT)(p, q) in words: Neither p nor q· [p · ~q or p | q]',
    '(FFTF)(p, q) in words: p and not q· [p · ~q]',
    '(FTFF)(p, q) in words: q and not p· [q · ~p]',
    '(TFFF)(p, q) in words: p and q· [p · q]',
    '(FFFF)(p, q) Contradiction (p and not p; and q and not q) [p · ~p · q · ~q]',
];

interface Props {
    dataKey: string;
    index?: string | null;
    language?: string | null;
}

export const Custom = ({ dataKey, index, language }: Props) => {
    if (dataKey === '4.31') {
        return <CustomTruthTable language={language} />;
    }
    if (dataKey === '4.442') {
        const v = language === 'en' ? values4442_en : values4442;
        return <FlexContainer><TruthTable col={3} values={v} /></FlexContainer>;
    }
    if (dataKey === '5.101') {
        const v = language === 'en' ? values5101_en : language === 'de' ? values5101_de : values5101;
        return (
            <ListContainer>
                {v.map((value, index) => (<div key={index}>{value}</div>))}
            </ListContainer>
        );
    }
    if (dataKey === '5.5423') {
        return <Centered><CustomCube /></Centered>;
    }
    if (dataKey === '5.6331') {
        return <Centered><CustomSight language={language} /></Centered>;
    }
    if (dataKey === '6.02') {
        return (
            <FlexCentered>
                <AlignRight>
                    0 ＋ 1 ＝ 1 <span style={{ marginLeft: '20px' }}>Def.</span><br />
                    0 ＋ 1 ＋ 1 ＝ 2 <span style={{ marginLeft: '20px' }}>Def.</span><br />
                    0 ＋ 1 ＋ 1 ＋ 1 ＝ 3 <span style={{ marginLeft: '20px' }}>Def.</span>
                </AlignRight>
            </FlexCentered>
        );
    }
    if (dataKey === '6.1203') {
        if (index === '1') {
            return <Centered><CustomDiagram1 language={language} /></Centered>;
        }
        if (index === '2') {
            return <Centered><CustomDiagram2 language={language} /></Centered>;
        }
        if (index === '3') {
            return <Centered><CustomDiagram3 language={language} /></Centered>;
        }
        if (index === '4') {
            return <Centered><CustomDiagram4 language={language} /></Centered>;
        }
        if (index === '5') {
            return <Centered><CustomDiagram5 language={language} /></Centered>;
        }
    }
};
