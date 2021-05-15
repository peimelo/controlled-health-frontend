import { Pagination } from '../../shared/models';
import { ExamResult } from './exam-result.model';

export interface ExamResultResponse {
  meta: Pagination;
  exam_results: ExamResult[];
}
