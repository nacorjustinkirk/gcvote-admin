interface Department {
    depCode: string;
    depName: string;
    programs: Array<Program>;
}

interface Program {
    progCode: string;
    progName: string;
}

export const department = [
    {
        depCode: 'ALL',
        depName: 'Gordon College',
        programs: []
    },
    {
        depCode: 'CAHS',
        depName: 'College of Allied Health Studies',
        programs: [
            {
                progCode: 'BSN',
                progName: 'Bachelor of Science in Nursing'
            },
            {
                progCode: 'BSM',
                progName: 'Bachelor of Science in Midwifery'
            },
        ]
    },
    {
        depCode: 'CBA', 
        depName: 'College of Business and Accountancy',
        programs: [
            {
                progCode: 'BSA', 
                progName: 'Bachelor of Science in Accountancy'
            },
            {
                progCode: 'BSCA',
                progName: 'Bachelor of Science in Customs Administration'
            },
            {
                progCode: 'BSBA', 
                progName: 'Bachelor of Science in Business Administration'
            },
        ]
    },
    {
        depCode: 'CCS', 
        depName: 'College of Computer Studies',
        programs: [
            {
                progCode: 'BSIT', 
                progName: 'Bachelor of Science in Information Technology'
            },
            {
                progCode: 'BSCS', 
                progName: 'Bachelor of Science in Computer Science'
            },
            {
                progCode: 'BSEMC', 
                progName: 'Bachelor of Science in Entertainment and Multimedia Computing'
            },
            {
                progCode: 'ACT', 
                progName: 'Associate in Computer Technology'
            },
        ]
    },
    {
        depCode: 'CEAS', 
        depName: 'College of Education, Arts and Sciences',
        programs: [
            {
                progCode: 'BEE', 
                progName: 'Bachelor of Elementary Education'
            },
            {
                progCode: 'BSEd',
                progName: 'Bachelor of Secondary Education'
            },
            {
                progCode: 'BCAEd', 
                progName: 'Bachelor of Culture and Arts Education'
            },
            {
                progCode: 'BPEd',
                progName: 'Bachelor of Physical Education'
            },
            {
                progCode: 'BECEd', 
                progName: 'Bachelor of Early Childhood Education'
            },
            {
                progCode: 'BAComm', 
                progName: 'Bachelor of Arts in Communication'
            },
        ]
    },
    {
        depCode: 'CHTM', 
        depName: 'College of Hospitality and Tourism Management',
        programs: [
            {
                progCode: 'BSTM', 
                progName: 'Bachelor of Science in Tourism Management'
            },
            {
                progCode: 'BSHM',
                progName: 'Bachelor of Science in Hospitality Management'
            },
        ]
    },
];