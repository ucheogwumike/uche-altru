const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const complaintValidation = require('../../validations/complaint.validation');
const complaintController = require('../../controllers/complaint.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(complaintValidation.createComplaint), complaintController.createComplaint)
  .get(complaintController.getAllComplaints);

router
  .route('/:complaintId')
  .get(validate(complaintValidation.getComplaint), complaintController.getComplaint)
  .patch(auth('admin'), validate(complaintValidation.updateComplaint), complaintController.updateComplaint)
  .delete(auth('admin'), validate(complaintValidation.deleteComplaint), complaintController.deleteComplaint);

router
  .route('/:complaintId/:status')
  .patch(auth('admin'), validate(complaintValidation.updateComplaintStatus), complaintController.updateComplaintStatus);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Complaints
 *   description: Complaint Creation and Management
 */

/**
 * @swagger
 * /complaints:
 *   post:
 *     summary: Create a complaint
 *     description: Any User/Visitor can create complaints.
 *     tags: [Complaints]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - firstname
 *               - lastname
 *               - email
 *             properties:
 *               tile:
 *                 type: string
 *               description:
 *                 type: string
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique i.e only one complaint from an email
 *               role:
 *                  type: string
 *                  enum: [user, admin]
 *             example:
 *               title: Fake Campaign
 *               description: I worked at the hospital and there is no record for this patient
 *               firstname: Owolabi
 *               lastname: Emeka
 *               email: owlabiemaka@gmail.com
 *               role: user
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Complaint'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all complaints
 *     description: Only users/admins can retrieve all complaints.
 *     tags: [Complaints]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Complaint name
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: Complaint role
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of complaints
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Complaint'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /complaints/{id}:
 *   get:
 *     summary: Get a complaint
 *     description: Logged in users can fetch only their own complaint information. Only admins can fetch other complaints.
 *     tags: [Complaints]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Complaint id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Complaint'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a complaint
 *     description: Logged in complaints can only update their own information. Only admins can update other complaints.
 *     tags: [Complaints]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Complaint id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *             example:
 *               message: Nice idea
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Complaint'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /complaints/{id}:
 *   patch:
 *     summary: Update a complaint status
 *     description: Only admins can update complaint's status.
 *     tags: [Complaints]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Complaint id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *             example:
 *               status: resolved
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Complaint'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a complaint
 *     description: Logged in users can delete only their own complaint. Only admins can delete other complaints.
 *     tags: [Complaints]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Complaint id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
