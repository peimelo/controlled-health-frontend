import { createAction, props } from '@ngrx/store';
import { Exam } from '../../core/models';

// export const addExamExam = createAction(
//   '[Exam Detail Page] Add Exam Exam'
// );

// export const changePageExams = createAction(
//   '[Exam Detail Page] Change Page Exams',
//   props<{ pageIndex: number }>()
// );

// export const createExam = createAction(
//   '[Exam Detail Page] Create Exam',
//   props<{ exam: Exam }>()
// );

// export const deleteExamExam = createAction(
//   '[Exam Detail Page] Delete Exam Exam',
//   props<{ id: number; examId: number }>()
// );

// export const editExamExam = createAction(
//   '[Exam Detail Page] Edit Exam Exam',
//   props<{ examExam: ExamExam }>()
// );

// export const sortExams = createAction(
//   '[Exam Detail Page] Sort Exams',
//   props<{ sort: Sort }>()
// );

export const updateExam = createAction(
  '[Exam Detail Page] Update Exam',
  props<{ exam: Exam }>()
);
