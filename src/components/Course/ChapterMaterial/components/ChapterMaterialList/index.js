/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useEffect } from 'react';
import API from '@aws-amplify/api';
import PropTypes from 'prop-types';
import { Alert, ListGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { useParams } from "react-router-dom";

import Loading from '../../../../Loading';
import MaterialCard from './components/MaterialCard';
import ChapterAddMaterial from './components/ChapterAddMaterial';
import { adViewMatAPI } from '../../../../../api/materials';
import { addBulkMaterials } from '../../../../../redux/courses/materialActions';
import { deleteMaterial, upMaterial, downMaterial } from '../../../../../redux/courses/materialActions';
import { deleteMatAPI, swapMatAPI } from '../../../../../api/materials';

export const lpath = '/courses/:courseId/mat/:chapId';
const ChapterMaterialList = (props) => {
  const { courseId, edit = false } = props;
  const { chapId: chapterId } = useParams();
  const materials = useSelector(state => ((state.Courses[courseId] || {}).Materials || {})[chapterId] || []);
  const dispatch = useDispatch();
  const alert = useAlert();


  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);
  useEffect(() => {
    async function onLoad() {
      if (chapterId !== '') {
        if (materials.length > 0) {
          setLoading(false);
        } else {
          try {
            setFetching(true);
            const promise = adViewMatAPI(courseId, chapterId).then((mats) => { dispatch(addBulkMaterials(chapterId, courseId, mats)); setFetching(false); });
            return promise;
          } catch (e) {

          } finally {
            setLoading(false)
          }
        }
      }
    }
    let promise = onLoad();
    return () => API.cancel(promise);
  }, [courseId, chapterId]);

  if (chapterId === '') {
    return <Alert variant="info">Select a Chapter first</Alert>;;
  }
  if (fetching || loading) {
    return <Loading />;
  }
  if (materials.length === 0) {
    return (
      <Fragment>
        <Alert variant="warning">No Materials yet.</Alert>
        <ChapterAddMaterial courseId={courseId} chapterId={chapterId} />
      </Fragment>
    );
  }

  const handleRemove = async (id, chapterId, courseId, index) => {
    if (window.confirm('Are you sure? This is permanent!')) {
      try {
        await deleteMatAPI(courseId, chapterId, id, index);
        dispatch(deleteMaterial(id, chapterId, courseId));
        alert.success('Material deleted!');
      } catch (e) {
        alert.error("Unable to delete Material");
      }
    }
  };

  const handleUp = async (id, chapterId, courseId, index) => {
    if (index === 0) return;
    const newIndex = index - 1;
    try {
      await swapMatAPI(courseId, chapterId, id, index, materials[newIndex].id, newIndex);
      dispatch(upMaterial(id, chapterId, courseId, index));
    } catch (e) {
      alert.error("Unable to move Material");
    }
  };

  const handleDown = async (id, chapterId, courseId, index) => {
    if (index === materials.length - 1) return;
    const newIndex = index + 1;
    try {
      await swapMatAPI(courseId, chapterId, id, index, materials[newIndex].id, newIndex);
      dispatch(downMaterial(id, chapterId, courseId, index));
    } catch (e) {
      alert.error("Unable to move Material");
    }
  };

  return (
    <Fragment>
      <ListGroup>
        {materials.map((material, index) => (
          <MaterialCard
            key={material.id}
            ind={index}
            material={material}
            courseId={courseId}
            chapterId={chapterId}
            edit={edit}
            handleRemove={handleRemove}
            handleUp={handleUp}
            handleDown={handleDown}
          />
        ))}
      </ListGroup>
      {edit && (
        <ChapterAddMaterial courseId={courseId} chapterId={chapterId} />
      )}
    </Fragment>
  );
};

ChapterMaterialList.propTypes = {
  loading: PropTypes.bool.isRequired,
  materials: PropTypes.array,
  courseId: PropTypes.string,
  chapterId: PropTypes.string,
  edit: PropTypes.bool,
};

ChapterMaterialList.defaultProps = {
  loading: true,
}

export default ChapterMaterialList;
