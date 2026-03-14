# Projects

I build projects that explore the intersection of artificial intelligence, systems engineering, and intelligent interfaces. My work ranges from operating system–level AI agents to embedded assistive technologies and applied machine learning systems.

Many of my projects focus on combining machine learning with real-world systems, where models interact with hardware, operating systems, or structured knowledge pipelines rather than existing as isolated experiments.

## AINux

AINux is an AI-augmented development environment built on Debian. It embeds an intelligent agent directly into the operating system to interpret user intent and automate workflows.

The system uses a hybrid architecture combining a Go-based core with a Python-based machine learning agent. Communication between components is handled through high-performance Unix socket IPC, allowing the AI layer to interact efficiently with system processes.

The project also explores concepts such as AI-assisted shell interactions, system automation through natural language, and Git-based system state snapshotting.

## OrthoLens

OrthoLens is a real-time augmented reality system designed to assist medical professionals by overlaying diagnostic indicators onto live camera feeds.

The system combines computer vision and machine learning models with AR rendering. It performs live inference using PyTorch models while rendering augmented visual cues through AR frameworks such as Unity or WebXR.

Interaction with the system is designed to be intuitive through gesture and voice-based controls.

## VisionAid

VisionAid is an offline assistive device designed for visually impaired users. The system combines computer vision with sensor-based obstacle detection on a Raspberry Pi.

It uses object detection models such as YOLO along with classical computer vision techniques like HOG for identifying nearby objects. Ultrasonic sensors provide additional environmental awareness, while an offline speech system powered by Vosk provides real-time audio feedback to the user.

The system is designed to operate fully offline, making it suitable for low-connectivity environments.

## VerifyMD

VerifyMD is an AI-powered assistant designed to support orthopedic doctors in analyzing X-ray images.

The system uses a ResNet-based convolutional neural network trained to classify orthopedic conditions with high accuracy. It integrates large language models through Google Gemini and LangChain to enable conversational interaction with medical data.

A FAISS-based vector retrieval system allows doctors to query medical knowledge and receive contextual explanations alongside model predictions.

## Vector Database Optimization System for LLM Retrieval Pipelines

This project explores performance optimization techniques for vector databases used in large language model retrieval pipelines.

The system benchmarks different vector indexing strategies, including HNSW-based approximate nearest neighbour search, against exact search baselines. It evaluates the trade-offs between latency, recall, and throughput across different configurations.

The project aims to improve retrieval performance for RAG-based systems by identifying optimal indexing parameters and database configurations for large-scale embedding workloads.