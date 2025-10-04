'use client';

import React, { useState } from 'react';
import Modal from './Modal';
import { simpleMissionService } from '@/lib/simpleMissionService';
import { getCurrentUser } from '@/lib/wallet/utils';

interface Mission {
  code: string;
  description: string;
  status: string;
  priority: string;
  eta: string;
  teamSize: number;
  progress: number;
}

interface MissionDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  mission: Mission | null;
  onMissionCompleted?: () => void;
}

const MissionDetailsModal: React.FC<MissionDetailsModalProps> = ({ isOpen, onClose, mission, onMissionCompleted }) => {
  const [isJoining, setIsJoining] = useState(false);

  if (!mission) return null;

  const handleJoinMission = async () => {
    setIsJoining(true);
    
    const user = getCurrentUser();
    if (!user) {
      alert('Please connect your wallet first to join missions!');
      setIsJoining(false);
      return;
    }

    try {
      const success = await simpleMissionService.joinMission(mission.code);
      
      if (success) {
        const newPoints = await simpleMissionService.getUserPoints();
        alert(`🎉 Mission ${mission.code} completed!\n💰 Earned 1 point!\n📊 Total points: ${newPoints}`);
        
        // Call parent callback if provided
        if (onMissionCompleted) {
          onMissionCompleted();
        }
        
        onClose();
      } else {
        alert('Failed to join mission. You may have already joined this mission.');
      }
    } catch (error) {
      console.error('Error joining mission:', error);
      alert('Failed to join mission. Please try again.');
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Mission Details" size="large">
      <div className="space-y-6">
        {/* Mission Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-accent-red font-mono">{mission.code}</h3>
            <p className="text-gray-400 text-sm mt-1">Mission Code: {mission.code}</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${mission.status === 'active' ? 'bg-accent-red' : mission.status === 'pending' ? 'bg-yellow-400' : 'bg-green-400'} pulse-glow`}></div>
            <span className="text-sm text-gray-400 uppercase">{mission.status}</span>
          </div>
        </div>

        {/* Mission Description */}
        <div className="bg-dark-border/30 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">Mission Brief</h4>
          <p className="text-gray-300 leading-relaxed">{mission.description}</p>
        </div>

        {/* Mission Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-dark-border/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-accent-red">{mission.priority}</div>
            <div className="text-sm text-gray-400">Priority</div>
          </div>
          <div className="bg-dark-border/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white">{mission.eta}</div>
            <div className="text-sm text-gray-400">ETA</div>
          </div>
          <div className="bg-dark-border/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-accent-orange">{mission.teamSize}</div>
            <div className="text-sm text-gray-400">Team Size</div>
          </div>
        </div>

        {/* Requirements */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Requirements</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-gray-300">Wallet Connection Required</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-gray-300">Simple Click Action</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-gray-300">No Special Skills Needed</span>
            </div>
          </div>
        </div>

        {/* Team Members */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Mission Participants</h4>
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center space-x-3 bg-dark-border/30 rounded-lg p-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">U</span>
              </div>
              <div>
                <div className="text-sm font-semibold text-white">You</div>
                <div className="text-xs text-gray-400">Solo Mission</div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-4 pt-4 border-t border-dark-border">
          <button
            onClick={handleJoinMission}
            disabled={isJoining}
            className="flex-1 bg-accent-red hover:bg-accent-red/80 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 glow-effect"
          >
            {isJoining ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Joining...</span>
              </div>
            ) : (
              'Join Mission'
            )}
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-dark-border hover:bg-dark-border/80 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default MissionDetailsModal;
