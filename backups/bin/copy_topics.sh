#!/bin/bash

gcloud config set project titan-241022
gcloud alpha firestore export gs://titan-241022-topics --collection-ids='challenge-topics', 'category-topics'
gcloud config set project titan-demonstration
gcloud alpha firestore import gs://titan-241022-topics --collection-ids='challenge-topics', 'category-topics'
