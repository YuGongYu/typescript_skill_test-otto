export type CompanyISIN = string
export type QuestionId = string
export type DatetimeString = string
export type DateString = string

export interface AnswerByIdQuery {
    id: string // ID of the answer
}

export interface ScoreByIsinQuery {
    isin: CompanyISIN // ISIN of the target company
    date?: DateString //  date of the score
}

export interface AnswersQuery {
    isin?: CompanyISIN // ISIN of the target company
    start?: DateString // start date of the query
    end?: DateString // end date of the query
    ids?: string // ids of the answers to include, separated by a comma
    user?: string // ids of the answers to include, separated by a comma
}

export interface CompanyAggregatedAnswersQuery {
    end: DateString // end date for twelve months period
    minCount: number // skip answers where count is less than this
}

export interface Answer {
    value: number
    source: string
    created: DatetimeString // for example "2021-01-16T11:51:59.000Z"
    skip: boolean
    id: string
    user: string
    company: Company
    question: Question
}

export interface Company {
    standby: false
    title: string
    tid: number
    isin: CompanyISIN
    id: number
}

export interface Question {
    fullText: string
    shortText: string
    tag: string
    id: QuestionId
    isPublic: boolean
    isActive: boolean
    translations?: Record<string, Partial<Question>>
}

export interface AggregatedAnswerScore {
    min: number
    max: number
    avg: number
    total: number
    count: number
    start: DatetimeString
    end: DatetimeString
    companyIsin: CompanyISIN
    questionId: QuestionId
}
